use crate::configuration::{DatabaseSettings, Settings};

use actix_web::dev::Server;
use actix_web::web::Data;
use actix_web::{App, HttpServer};
use paperclip::actix::{
    OpenApiExt,
};
use paperclip::v2::models::DefaultApiRaw;
use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;
use std::net::TcpListener;
use tracing_actix_web::TracingLogger;
use crate::routes::http_routes;

pub struct Application {
    port: u16,
    server: Server,
}

impl Application {
    pub async fn build(configuration: Settings) -> Result<Self, std::io::Error> {
        let connection_pool = get_connection_pool(&configuration.database);
        let address = format!(
            "{}:{}",
            configuration.application.host, configuration.application.port
        );

        let listener = TcpListener::bind(address)?;
        let port = listener.local_addr().unwrap().port();
        let server = run(listener, connection_pool)?;

        Ok(Self { port, server })
    }

    pub fn port(&self) -> u16 {
        self.port
    }

    pub async fn run_until_stopped(self) -> Result<(), std::io::Error> {
        self.server.await
    }
}

pub fn get_connection_pool(configuration: &DatabaseSettings) -> PgPool {
    PgPoolOptions::new()
        .acquire_timeout(std::time::Duration::from_secs(2))
        .connect_lazy_with(configuration.with_db())
}

fn run(listener: TcpListener, db_pool: PgPool) -> Result<Server, std::io::Error> {
    let db_pool = Data::new(db_pool);
    let server = HttpServer::new(move || {
        App::new()
            .wrap(TracingLogger::default())
            .wrap_api_with_spec(DefaultApiRaw::default())
            .configure(http_routes)
            // App Data accessible in all routes
            .app_data(db_pool.clone())
            // Swagger Stuff
            .with_json_spec_at("/docs.json")
            .with_swagger_ui_at("/docs")
            .build()
    })
    .listen(listener)?
    .run();
    Ok(server)
}

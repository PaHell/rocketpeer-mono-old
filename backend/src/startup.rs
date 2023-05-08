use crate::routes::{get_all_users, health_check};
use actix_web::{dev::Server, web, App, HttpServer};
use sqlx::PgPool;
use std::net::TcpListener;

pub fn run(listener: TcpListener, db_pool: PgPool) -> Result<Server, std::io::Error> {
    let connection = web::Data::new(db_pool);
    let server = HttpServer::new(move || {
        App::new()
            .route("/health_check", web::get().to(health_check))
            .route("/user/", web::get().to(get_all_users))
            .app_data(connection.clone())
    })
    .listen(listener)?
    .run();
    Ok(server)
}

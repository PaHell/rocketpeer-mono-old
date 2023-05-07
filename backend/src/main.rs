use backend::configuration::get_configuration;
use backend::startup::run;
use sqlx::PgPool;
use std::net::TcpListener;

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let configuration = get_configuration().expect("failed to get config");
    let connection_pool = PgPool::connect_lazy(&configuration.database.connection_string())
        .await
        .expect("failed to connect to postgres");
    let address = format!("127.0.0.1:{}", configuration.application_port);
    let listener = TcpListener::bind(address)?;
    run(listener, connection_pool)?.await
}

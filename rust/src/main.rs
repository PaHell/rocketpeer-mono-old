use actix_web::{get, App, HttpResponse, HttpServer};

#[tokio::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(move || App::new().service(test))
        .bind(("127.0.0.1", 8081))?
        .run()
        .await
}

#[get("/test")]
async fn test() -> HttpResponse {
    HttpResponse::Ok().body("oK")
}

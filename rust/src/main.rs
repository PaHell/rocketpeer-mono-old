use actix_web::web::get;
use actix_web::{web, App, HttpResponse, HttpServer};

async fn hello() -> HttpResponse {
    HttpResponse::Ok().body("hello")
}
async fn bye() -> HttpResponse {
    HttpResponse::Ok().body("bye")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("starting server");
    HttpServer::new(move || {
        App::new().service(
            web::scope("/api").service(
                web::scope("/users")
                    .route("/hello", get().to(hello))
                    .route("/bye", get().to(bye)),
            ),
        )
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}

use actix_web::{web, App, HttpServer};
mod prisma;
mod routes;
use prisma::PrismaClient;
use routes::user_related::users::{create_user, get_all_users};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client = web::Data::new(PrismaClient::_builder().build().await.unwrap());

    println!("starting server");
    HttpServer::new(move || {
        App::new().app_data(client.clone()).service(
            web::scope("/api").service(
                web::scope("/users")
                    .route("getAllUsers", web::get().to(get_all_users))
                    .route("/createUser", web::post().to(create_user)),
            ),
        )
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}

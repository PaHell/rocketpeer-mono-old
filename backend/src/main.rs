use actix_web::{web, App, HttpServer};
mod prisma;
mod routes;
use prisma::PrismaClient;
use routes::user_related::{
    access_tokens::validate_token,
    messages::{create_message, delete_message, get_messages_of_user, update_message},
    users::{
        create_user, delete_user, get_all_users, get_specific_user, update_user_password,
        update_user_personal_data,
    },
};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client = web::Data::new(PrismaClient::_builder().build().await.unwrap());

    println!("starting server");
    HttpServer::new(move || {
        App::new().app_data(client.clone()).service(
            web::scope("/api").service(
                web::scope("/user")
                    .route("", web::get().to(get_all_users))
                    .route("{id}", web::get().to(get_specific_user))
                    .route("", web::put().to(create_user))
                    .route("{id}", web::delete().to(delete_user))
                    .route("{id}", web::patch().to(update_user_personal_data)),
            ),
        )
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}

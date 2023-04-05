use crate::routes::json_structs::Server;
use actix_web::{
    web::{self, Json, Path},
    HttpResponse,
};

use crate::prisma::{server, PrismaClient};

pub async fn create_server(client: web::Data<PrismaClient>, server: Json<Server>) -> HttpResponse {
    let new_server = client
        .server()
        .create(
            server.name.to_owned(),
            server.description.to_owned(),
            vec![server::image::set(Some(server.image.to_owned()))],
        )
        .exec()
        .await;

    match new_server {
        Ok(v) => HttpResponse::Ok().json(v),
        Err(e) => HttpResponse::NotAcceptable().body(format!("Server not created due to {:?}", e)),
    }
}

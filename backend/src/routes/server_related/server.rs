use crate::{
    prisma::{text_channel, voice_channel},
    routes::json_structs::Server,
};
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
        .await
        .unwrap();
    let text = client
        .text_channel()
        .create(
            1,
            "General".to_owned(),
            format!("General Channel for {}", &new_server.name),
            server::id::equals(new_server.id),
            vec![],
        )
        .exec()
        .await
        .unwrap();

    let updated_server = client
        .server()
        .update(
            server::id::equals(new_server.id),
            vec![server::general_text_channel::set(Some(text.id))],
        )
        .exec()
        .await
        .unwrap();

    HttpResponse::Ok().json(updated_server)
}

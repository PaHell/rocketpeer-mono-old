use crate::prisma::{chat_message, user, PayloadType, PrismaClient};
use crate::routes::json_structs::Message;
use actix_web::{
    web::{self, Json, Path},
    HttpResponse,
};
use chrono::Utc;

fn match_message_type(json_val: i32) -> PayloadType {
    let result = match json_val {
        1 => PayloadType::Text,
        2 => PayloadType::Image,
        3 => PayloadType::Video,
        4 => PayloadType::Audio,
        _ => PayloadType::Text,
    };
    result
}

pub async fn get_messages_of_user(
    client: web::Data<PrismaClient>,
    user_id: Path<i32>,
) -> HttpResponse {
    let messages = client
        .chat_message()
        .find_many(vec![chat_message::user_id::equals(user_id.to_owned())])
        .exec()
        .await;

    match messages {
        Ok(message) => HttpResponse::Ok().json(message),
        Err(e) => HttpResponse::NotFound().body(format!("{:?}", e)),
    }
}

pub async fn delete_message(client: web::Data<PrismaClient>, id: Path<i32>) -> HttpResponse {
    let message = client
        .chat_message()
        .update(
            chat_message::id::equals(id.to_owned()),
            vec![
                chat_message::r#type::set(PayloadType::Deleted),
                chat_message::payload::set("".to_owned()),
                chat_message::deleted_at::set(Some(Utc::now().into())),
            ],
        )
        .exec()
        .await;
    match message {
        Ok(v) => HttpResponse::Ok().json(v),
        Err(e) => {
            HttpResponse::BadRequest().body(format!("Message couldnt be deleted because: {:?}", e))
        }
    }
}
pub async fn update_message(
    client: web::Data<PrismaClient>,
    id: Path<i32>,
    new_message: Json<Message>,
) -> HttpResponse {
    let message_type = match_message_type(new_message.message_type);
    let message = client
        .chat_message()
        .update(
            chat_message::id::equals(id.to_owned()),
            vec![
                chat_message::payload::set(new_message.payload.to_owned()),
                chat_message::r#type::set(message_type),
            ],
        )
        .exec()
        .await;
    match message {
        Ok(v) => HttpResponse::Ok().json(v),
        Err(e) => {
            HttpResponse::BadRequest().body(format!("Message couldnt be updated because: {:?}", e))
        }
    }
}
pub async fn create_message(
    client: web::Data<PrismaClient>,
    message: Json<Message>,
) -> HttpResponse {
    let message_type = match_message_type(message.message_type);
    let new_message = client
        .chat_message()
        .create(
            message.chat_id.to_owned(),
            message.user_id.to_owned(),
            message_type.to_owned(),
            message.payload.to_owned(),
            vec![],
        )
        .exec()
        .await;

    match new_message {
        Ok(message) => HttpResponse::Ok().json(message),
        Err(e) => HttpResponse::NotFound().body(format!("{:?}", e)),
    }
}

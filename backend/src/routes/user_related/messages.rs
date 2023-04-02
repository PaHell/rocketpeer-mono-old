use crate::prisma::{message, MessageType, PrismaClient};
use crate::routes::json_structs::Message;
use actix_web::{
    web::{self, Json, Path},
    HttpResponse,
};
use chrono::Utc;

fn match_message_type(json_val: i32) -> MessageType {
    let result = match json_val {
        1 => MessageType::Text,
        2 => MessageType::Picture,
        3 => MessageType::Video,
        4 => MessageType::Gif,
        5 => MessageType::Deleted,
        _ => MessageType::Text,
    };
    result
}

pub async fn get_messages_of_user(
    client: web::Data<PrismaClient>,
    user_id: Path<i32>,
) -> HttpResponse {
    let messages = client
        .message()
        .find_many(vec![message::sender_id::equals(user_id.to_owned())])
        .exec()
        .await;

    match messages {
        Ok(message) => HttpResponse::Ok().json(message),
        Err(e) => HttpResponse::NotFound().body(format!("{:?}", e)),
    }
}

pub async fn delete_message(client: web::Data<PrismaClient>, id: Path<i32>) -> HttpResponse {
    let message = client
        .message()
        .update(
            message::id::equals(id.to_owned()),
            vec![
                message::r#type::set(MessageType::Deleted),
                message::payload::set("".to_owned()),
                message::deleted_at::set(Some(Utc::now().into())),
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
        .message()
        .update(
            message::id::equals(id.to_owned()),
            vec![
                message::payload::set(new_message.payload.to_owned()),
                message::r#type::set(message_type),
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
        .message()
        .create(
            message_type,
            message.payload.to_owned(),
            crate::prisma::users::UniqueWhereParam::IdEquals(message.receiver_id.to_owned()),
            crate::prisma::users::UniqueWhereParam::IdEquals(message.sender_id.to_owned()),
            vec![],
        )
        .exec()
        .await;

    match new_message {
        Ok(message) => HttpResponse::Ok().json(message),
        Err(e) => HttpResponse::NotFound().body(format!("{:?}", e)),
    }
}

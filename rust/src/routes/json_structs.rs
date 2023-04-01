use crate::prisma::{MessageType, UsersPrivacyLevel, UsersRole, UsersStatus};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct User {
    pub user_name: String,
    pub password: String,
    pub display_name: String,
    pub first_name: String,
    pub last_name: String,
    pub image: String,
    pub status: i32,
    pub email: String,
    pub privacy_level: i32,
    pub role: i32,
}

#[derive(Deserialize)]
pub struct Message {
    pub sender_id: i32,
    pub receiver_id: i32,
    pub message_type: i32,
    pub payload: String,
}

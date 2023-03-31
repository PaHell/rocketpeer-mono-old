use crate::prisma::{UsersPrivacyLevel, UsersRole, UsersStatus};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct User {
    pub user_name: String,
    pub password: String,
    pub display_name: String,
    pub first_name: String,
    pub last_name: String,
    pub image: String,
    pub status: UsersStatus,
    pub email: String,
    pub privacy_level: UsersPrivacyLevel,
    pub role: UsersRole,
}

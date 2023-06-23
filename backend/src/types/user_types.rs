use chrono::DateTime;
use paperclip::actix::Apiv2Schema;
use serde::{Deserialize, Serialize};

use uuid::Uuid;

#[derive(Serialize, Deserialize, sqlx::Type, sqlx::FromRow, Apiv2Schema)]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub display_name: String,
    pub first_name: String,
    pub last_name: String,
    pub image: String,
    pub status: UserStatus,
    pub email: String,
    pub privacy_level: UserPrivacyLevel,
    pub role: UserRole,
    pub created_at: DateTime<chrono::Utc>,
}

#[derive(Serialize, Deserialize, sqlx::Type, Apiv2Schema)]
#[sqlx(type_name = "status")]
pub enum UserStatus {
    Online = 1,
    Away = 2,
    DoNotDisturb = 3,
    Offline = 4,
}

#[derive(Serialize, Deserialize, sqlx::Type, Apiv2Schema)]
#[sqlx(type_name = "privacy_level")]
pub enum UserPrivacyLevel {
    Public = 1,
    Friends = 2,
    SharedServerAndFriends = 3,
    Private = 4,
}

#[derive(Serialize, Deserialize, sqlx::Type, Apiv2Schema)]
#[sqlx(type_name = "role")]
pub enum UserRole {
    None = 1,
    Moderator = 2,
    Administrator = 3,
    Owner = 4,
}

#[derive(Serialize, Deserialize, sqlx::Type, Apiv2Schema)]
pub struct FrontendGeneratedUser {
    pub username: String,
    pub password: String,
    pub display_name: String,
    pub first_name: String,
    pub last_name: String,
    pub image: String,
    pub email: String,
}

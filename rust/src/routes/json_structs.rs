use rocket::http::hyper::body::Bytes;

pub struct User {
    user_name: String,
    password: String,
    display_name: String,
    first_name: String,
    last_name: String,
    image: Bytes,
    status: UserStatus,
    email: String,
    privacy_level: PrivacyLevel,
    role: UserRole,
}

pub enum UserStatus {
    Online,
    Away,
    DoNotDisturb,
    Offline,
}
pub enum PrivacyLevel {
    Default,
}
pub enum UserRole {
    Administrator,
    Default,
}

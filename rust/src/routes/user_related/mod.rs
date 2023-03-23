use rocket::get;
use rocket_okapi::openapi;

pub mod access_tokens;
pub mod messages;
pub mod user_friends;
pub mod users;

#[openapi]
#[get("/example")]
pub fn example_email() -> &'static str {
    "test@example.com"
}

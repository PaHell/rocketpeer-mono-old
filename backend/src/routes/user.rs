use crate::State;
use serde_json::json;
use serde::{Deserialize, Serialize};
use tide::{Request, Response, Result};
use utoipa::ToSchema;

#[derive(Serialize, Deserialize, ToSchema)]
pub struct NewUser {
    #[schema(example="Gaara")]
    pub user_name: String,

    #[schema(example="SecretPassword")]
    pub password: String,

    #[schema(example="Gaara_san")]
    pub display_name: String,

    #[schema(example="Marius")]
    pub first_name: String,

    #[schema(example="TestUser")]
    pub last_name: String,

    #[schema(example="base64 image")]
    pub image: String,

    #[schema(example=1)]
    pub status: i32,

    #[schema(example="Gaara@test.de")]
    pub email: String,

    #[schema(example=1)]
    pub privacy_level: i32,

    #[schema(example=1)]
    pub role: i32,
}

#[derive(Serialize, Deserialize, ToSchema)]
pub struct ServerUser {
    #[schema(example=1)]
    pub id: i32,
  #[schema(example="Gaara")]
    pub user_name: String,

    #[schema(example="SecretPassword")]
    pub password: String,

    #[schema(example="Gaara_san")]
    pub display_name: String,

    #[schema(example="Marius")]
    pub first_name: String,

    #[schema(example="TestUser")]
    pub last_name: String,

    #[schema(example="base64 image")]
    pub image: String,

    #[schema(example=1)]
    pub status: i32,

    #[schema(example="Gaara@test.de")]
    pub email: String,

    #[schema(example=1)]
    pub privacy_level: i32,

    #[schema(example=1)]
    pub role: i32,

    #[schema(example="2023-01-01_12:00")]
    pub created_at: String,
}


#[utoipa::path(
    post,
    path = "/api/user",
    request_body = NewUser,
    responses(
        (
            status = 201,
            description = "User created succesfully",
            body = ServerUser,
            content_type = "application/json"),
        (
            status = 400,
            description = "Failed to create user"
        )
    ),

    
)]
pub async fn create_user(request: Request<State>) -> Result<Response> {
    Ok(Response::builder(200).build())
}

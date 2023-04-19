use crate::State;
use serde::{Deserialize, Serialize};
use tide::{Request, Response, Result};
use uuid::Uuid;

#[derive(Serialize, Deserialize)]
pub struct NewUser {
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

#[derive(Serialize, Deserialize)]
pub struct ServerUser {
    pub id: String,
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
    pub created_at: String,
}

pub async fn create_user(request: Request<State>) -> Result<Response> {
    Ok(Response::builder(200).body("create user").build())
}
pub async fn update_user(request: Request<State>) -> Result<Response> {
    Ok(Response::builder(200).body("update user").build())
}
pub async fn delete_user(request: Request<State>) -> Result<Response> {
    Ok(Response::builder(200).body("delete user").build())
}
pub async fn get_user(request: Request<State>) -> Result<Response> {
    let test = Uuid::new_v4();
    println!("{}", test);
    Ok(Response::builder(200).body("alarm").build())
}
pub async fn get_all_users(request: Request<State>) -> Result<Response> {
    Ok(Response::builder(200).body("get all users").build())
}

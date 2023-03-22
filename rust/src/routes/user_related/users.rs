use actix_web::{web, App, HttpResponse, HttpServer};

pub async fn get_all_users() -> HttpResponse {
    HttpResponse::Ok().body("Hello")
}

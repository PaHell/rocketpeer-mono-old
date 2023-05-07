use super::types::User;
use actix_web::{body, web, HttpRequest, HttpResponse};
use chrono::Utc;
use serde::Deserialize;
use sqlx::PgPool;
use uuid::Uuid;

#[derive(Debug)]
struct ThatUser {
    last_name: String,
    first_name: String,
}
pub async fn get_all_users(req: HttpRequest, pool: web::Data<PgPool>) -> HttpResponse {
    match sqlx::query_as!(ThatUser, r#"SELECT last_name, first_name FROM users"#)
        .fetch_one(&pool)
        .await
    {
        Ok(v) => HttpResponse::Ok().body(format!("{:?}", v)),
        Err(e) => HttpResponse::InternalServerError().finish(),
    }
}

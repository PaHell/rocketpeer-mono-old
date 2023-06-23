use crate::types::{FrontendGeneratedUser};
use crate::user_routes::helper::{delete_user_with_id, insert_new_user_into_db, update_role, user_with_mail_exists};
use crate::user_routes::{fetch_single_user, update_user};
use actix_web::web::Path;
use actix_web::{web, HttpResponse};
use paperclip::actix::api_v2_operation;
use sqlx::PgPool;

use super::update_status;

#[api_v2_operation(tags(User))]
pub async fn get_user(db: web::Data<PgPool>, uuid: Path<String>) -> HttpResponse {
    match fetch_single_user(&db, uuid.to_string()).await {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(e) => HttpResponse::InternalServerError().body(format!(
            "There was no user with this uuid or the user was: {e}"
        )),
    }
}

#[api_v2_operation(tags(User))]
pub async fn create_user(
    db: web::Data<PgPool>,
    new_user: web::Json<FrontendGeneratedUser>,
) -> HttpResponse {
    if user_with_mail_exists(&db, &new_user.email).await {
        return HttpResponse::BadRequest().body(format!(
            "A user with the email '{}' allready exists. Please choose a different email address!",
            &new_user.email
        ));
    };
    match insert_new_user_into_db(&db, new_user).await {
        Ok(v) => HttpResponse::Created().json(v),
        Err(e) => HttpResponse::InternalServerError().body(format!(
            "The following error occured while creating the new user: {e}"
        )),
    }
}

//TODO: add confirmation if user to delete even exists

#[api_v2_operation(tags(User))]
pub async fn delete_user(db: web::Data<PgPool>, uuid: Path<String>) -> HttpResponse {
    match delete_user_with_id(&db, uuid.to_string()).await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::NotModified().finish(),
    }
}

#[api_v2_operation(tags(User))]
pub async fn update_user_data(
    db: web::Data<PgPool>,
    user: web::Json<FrontendGeneratedUser>,
    uuid: Path<String>,
) -> HttpResponse {
    match update_user(&db, uuid.to_string(), user.into_inner()).await {
        Ok(v) => HttpResponse::Ok().json(v),
        Err(_e) => HttpResponse::NotModified().finish(),
    }
}

#[api_v2_operation(tags(User))]
pub async fn update_user_status(db: web::Data<PgPool>, path: Path<(String, i8)>) -> HttpResponse {
    let (uuid, status) = path.into_inner();
    match update_status(&db, uuid, status).await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::NotModified().finish(),
    }
}


#[api_v2_operation(tags(User))]
pub async fn update_user_role(db: web::Data<PgPool>, path: Path<(String, i8)>) -> HttpResponse {
    let (uuid, role) = path.into_inner();
    match update_role(&db, uuid, role).await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::NotModified().finish()
    }
}

use crate::{
    prisma::{UsersPrivacyLevel, UsersRole, UsersStatus},
    routes::json_structs::User,
};
use actix_web::{
    web::{self, Json, Path},
    HttpResponse,
};

use crate::prisma::{users, PrismaClient};

pub async fn get_all_users(client: web::Data<PrismaClient>) -> HttpResponse {
    let users = client.users().find_many(vec![]).exec().await.unwrap();
    HttpResponse::Ok().json(users)
}

pub async fn create_user(client: web::Data<PrismaClient>, new_user: Json<User>) -> HttpResponse {
    let status = match new_user.status {
        1 => UsersStatus::Online,
        2 => UsersStatus::Away,
        3 => UsersStatus::DoNotDisturb,
        4 => UsersStatus::Offline,
        _ => UsersStatus::Offline,
    };
    let privacy_level = match new_user.privacy_level {
        1 => UsersPrivacyLevel::Default,
        _ => UsersPrivacyLevel::Default,
    };
    let role = match new_user.role {
        1 => UsersRole::Default,
        2 => UsersRole::Administrator,
        _ => UsersRole::Default,
    };
    let user = client
        .users()
        .create(
            new_user.user_name.to_owned(),
            new_user.password.to_owned(),
            new_user.first_name.to_owned(),
            new_user.last_name.to_owned(),
            new_user.image.to_owned(),
            status,
            new_user.email.to_owned(),
            privacy_level,
            role,
            vec![],
        )
        .exec()
        .await;

    match user {
        Ok(v) => HttpResponse::Created().json(v),
        Err(_) => HttpResponse::BadRequest().body(format!(
            "The mail: \"{}\" is allready associated to a different account, please log in or use a different mail!",
            new_user.email
        )),
    }
}

pub async fn get_specific_user(client: web::Data<PrismaClient>, id: Path<i32>) -> HttpResponse {
    let user_id = id.into_inner();
    let db_entry = client
        .users()
        .find_unique(users::id::equals(user_id))
        .exec()
        .await;

    match db_entry {
        Ok(user) => HttpResponse::Found().json(user),
        Err(_) => HttpResponse::NotFound().body(format!(
            "The user with the id: {} is not in the database",
            user_id
        )),
    }
}

pub async fn update_user_personal_data(
    client: web::Data<PrismaClient>,
    user_id: Path<i32>,
    updated_user: Json<User>,
) -> HttpResponse {
    let user = client
        .users()
        .update(
            users::id::equals(user_id.to_owned()),
            vec![
                users::first_name::set(updated_user.first_name.to_owned()),
                users::last_name::set(updated_user.last_name.to_owned()),
                users::user_name::set(updated_user.user_name.to_owned()),
                users::image::set(updated_user.image.to_owned()),
                users::email::set(updated_user.email.to_owned()),
            ],
        )
        .exec()
        .await;
    match user {
        Ok(v) => HttpResponse::Ok().json(v),
        Err(e) => HttpResponse::InternalServerError().body(format!("{:?}", e)),
    }
}

pub async fn update_user_password(
    client: web::Data<PrismaClient>,
    user_id: Path<i32>,
    new_password: String,
) -> HttpResponse {
    let user = client
        .users()
        .update(
            users::id::equals(user_id.to_owned()),
            vec![users::password::set(new_password.to_owned())],
        )
        .exec()
        .await;
    match user {
        Ok(v) => HttpResponse::Ok().json(v),
        Err(e) => HttpResponse::InternalServerError().body(format!("{:?}", e)),
    }
}

pub async fn delete_user(client: web::Data<PrismaClient>, user_id: Path<i32>) -> HttpResponse {
    let user = client
        .users()
        .delete(users::id::equals(user_id.to_owned()))
        .exec()
        .await;
    match user {
        Ok(v) => HttpResponse::Ok().json(v),
        Err(e) => HttpResponse::InternalServerError().body(format!("{:?}", e)),
    }
}

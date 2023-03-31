use crate::routes::json_structs::User;
use actix_web::{
    web::{self, Json},
    HttpResponse,
};

use crate::prisma::{users, PrismaClient};

pub async fn get_all_users(client: web::Data<PrismaClient>) -> HttpResponse {
    let users = client.users().find_many(vec![]).exec().await.unwrap();
    HttpResponse::Ok().json(users)
}

pub async fn create_user(client: web::Data<PrismaClient>, new_user: Json<User>) -> HttpResponse {
    let user = client
        .users()
        .create(
            new_user.user_name.to_owned(),
            new_user.password.to_owned(),
            new_user.first_name.to_owned(),
            new_user.last_name.to_owned(),
            new_user.image.to_owned(),
            new_user.status.to_owned(),
            new_user.email.to_owned(),
            new_user.privacy_level.to_owned(),
            new_user.role.to_owned(),
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

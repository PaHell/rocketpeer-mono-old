use crate::types::{FrontendGeneratedUser, User, UserPrivacyLevel, UserRole, UserStatus};

use actix_web::web::Json;

use chrono::{DateTime, Utc};

use sqlx::postgres::PgQueryResult;
use sqlx::{query, query_as, Error, PgPool};
use uuid::Uuid;

//TODO:  Create errorhandling if uuid cant be parsed

pub async fn fetch_single_user(db: &PgPool, uuid: String) -> Result<User, sqlx::Error> {
    query_as!(
        User,
        r#"
        SELECT
            id,
            username,
            display_name,
            first_name,
            last_name,
            image,
            status AS "status: UserStatus",
            email,
            privacy_level AS "privacy_level: UserPrivacyLevel",
            role AS "role: UserRole",
            created_at AS "created_at: DateTime<Utc>"
        FROM 
            users 
        WHERE 
            id = $1
        ;"#,
        Uuid::parse_str(&uuid).unwrap()
    )
    .fetch_one(db)
    .await
}

pub async fn user_with_mail_exists(db: &PgPool, mail: &str) -> bool {
    match query!(
        r#"
        SELECT 
            id
        FROM 
            users 
        WHERE 
            email = $1
        "#,
        mail
    )
    .fetch_one(db)
    .await
    {
        Ok(_) => return true,
        Err(_) => return false,
    }
}

pub async fn insert_new_user_into_db(
    db: &PgPool,
    new_user: Json<FrontendGeneratedUser>,
) -> Result<User, sqlx::Error> {
    return query_as!(
        User,
        r#"
        INSERT INTO users
        (
            username,
            password,
            display_name,
            first_name,
            last_name,
            image,
            status,
            email,
            privacy_level,
            role
        )
        VALUES 
        (
             $1,
             $2,
             $3,
             $4,
             $5,
             $6,
             $7,
             $8,
             $9,
             $10
         )
         RETURNING
            id,
            username,
            display_name,
            first_name,
            last_name,
            image,
            status AS "status: UserStatus",
            email,
            privacy_level AS "privacy_level: UserPrivacyLevel",
            role AS "role: UserRole",
            created_at AS "created_at: DateTime<Utc>"
         ;"#,
        new_user.username,
        new_user.password,
        new_user.display_name,
        new_user.first_name,
        new_user.last_name,
        new_user.image,
        UserStatus::Online as UserStatus,
        new_user.email,
        UserPrivacyLevel::Private as UserPrivacyLevel,
        UserRole::None as UserRole
    )
    .fetch_one(db)
    .await;
}
pub async fn delete_user_with_id(db: &PgPool, uuid: String) -> Result<PgQueryResult, Error> {
    query!(
        r#"
        DELETE FROM 
            users 
        WHERE 
            id = $1
        "#,
        Uuid::parse_str(&uuid).unwrap()
    )
    .execute(db)
    .await
}

pub async fn update_user(
    db: &PgPool,
    uuid: String,
    updated_user: FrontendGeneratedUser,
) -> Result<User, Error> {
    query_as!(
        User,
        r#"
        UPDATE 
            users 
        SET 
            username = $1,
            display_name = $2,
            first_name = $3,
            last_name = $4,
            image = $5,
            email = $6
        WHERE 
            id = $7 
        RETURNING
            id,
            username,
            display_name,
            first_name,
            last_name,
            image,
            status AS "status: UserStatus",
            email,
            privacy_level AS "privacy_level: UserPrivacyLevel",
            role AS "role: UserRole",
            created_at AS "created_at: DateTime<Utc>"
        "#,
        updated_user.username,
        updated_user.display_name,
        updated_user.first_name,
        updated_user.last_name,
        updated_user.image,
        updated_user.email,
        Uuid::parse_str(&uuid).unwrap()
    )
    .fetch_one(db)
    .await
}

pub async fn update_status(db: &PgPool, uuid: String, status: i8) -> Result<PgQueryResult, Error> {
    let parsed_status = UserStatus::try_from(status).unwrap();
    let test = query!(
        r#"
        UPDATE 
            users
        SET 
            status = ($1)
        WHERE 
            id = $2
        ;"#,
        parsed_status as UserStatus,
        Uuid::parse_str(&uuid).unwrap()
    )
    .execute(db)
    .await;
    println!("{:?}", &test);
    return test;
}

use actix_web::HttpResponse;
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug, Serialize, Deserialize)]
struct JwtToken {
    exp: usize,
    iat: usize,
    user_id: i32,
}

pub async fn generate_jwt_token(user_id: i32) -> HttpResponse {
    let secret = "secret";
    let header = Header::new(Algorithm::HS256);
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs() as usize;
    let jwt_token = JwtToken {
        exp: now + 60 * 60,
        iat: now,
        user_id: user_id,
    };
    let encoded_jwt = encode(
        &header,
        &jwt_token,
        &EncodingKey::from_secret(secret.as_ref()),
    )
    .unwrap();
    HttpResponse::Ok().json(encoded_jwt)
}

pub async fn validate_token(token: &str) -> Result<(), jsonwebtoken::errors::Error> {
    let validation = Validation::new(Algorithm::HS256);
    let secret = "secret";
    let decoded_token = decode::<JwtToken>(
        token,
        &DecodingKey::from_secret(secret.as_ref()),
        &validation,
    )?;
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs() as usize;
    if decoded_token.claims.exp < now {
        return Err(jsonwebtoken::errors::ErrorKind::ExpiredSignature.into());
    }
    Ok(())
}

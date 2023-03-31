use crate::prisma::PrismaClient;
use actix_web::{web, HttpResponse};

fn create_jwt() {}

pub async fn get_token(client: web::Data<PrismaClient>) -> HttpResponse {
    HttpResponse::Ok().body("Ok")
}

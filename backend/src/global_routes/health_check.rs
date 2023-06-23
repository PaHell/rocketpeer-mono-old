use actix_web::{HttpRequest, HttpResponse};
use paperclip::actix::api_v2_operation;

#[api_v2_operation(tags(General))]
pub async fn health_check(_req: HttpRequest) -> HttpResponse {
    HttpResponse::Ok().finish()
}
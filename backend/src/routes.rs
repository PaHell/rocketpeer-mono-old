use paperclip::actix::web;
use paperclip::actix::web::{delete, get, post, put};
use crate::global_routes::health_check::health_check;
use crate::user_routes::{create_user, delete_user, get_user, update_user_data, update_user_role, update_user_status};

pub fn http_routes(app: &mut web::ServiceConfig) {
    app.route("/health_check", get().to(health_check));
    // All user specific endpoints
    app.service(
        web::scope("/user")
            .route("/{uuid}", get().to(get_user))
            .route("/create", post().to(create_user))
            .route("/{uuid}", delete().to(delete_user))
            .route("/{uuid}", put().to(update_user_data))
            .route("/{uuid}/status={status}", put().to(update_user_status))
            .route("/{uuid}/role={role}", put().to(update_user_role))
    );
}
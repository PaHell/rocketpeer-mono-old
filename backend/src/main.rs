use clap::Parser;
mod routes;
use routes::user::create_user;
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::{env, sync::Arc};
use tide::{http::Mime, Response};
use utoipa::{OpenApi, ToSchema};
use utoipa_swagger_ui::Config;

#[derive(Clone)]
pub struct State {
    db: sqlx::MySqlPool,
}
#[derive(OpenApi)]
#[openapi(
    paths(routes::user::create_user),
    components(
        schemas(routes::user::NewUser, routes::user::ServerUser)
    ),
    tags( (name = "users", description = "user endpoints")
    ),
    info(description = "Rocketpeer Api Description"))]
struct ApiDoc;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    #[arg(short, long, default_value_t = false)]
    migrate: bool,
}

#[tokio::main]
async fn main() -> tide::Result<()> {
    // middleware logger start
    femme::start();

    // load .env var to db and create connection pool
    dotenv::dotenv().ok();
    let db_url = env::var("RUST_DB_URL").unwrap();
    let pool = sqlx::mysql::MySqlPool::connect(&db_url).await?;

    //parse args to check if --migrate is set
    let args = Args::parse();
    if args.migrate {
        sqlx::migrate!("./migrations").run(&pool).await?;
    }

    let config = Arc::new(Config::from("/api-docs/openapi.json"));

    //create webserver
    let mut app = tide::with_state(config);

    // add logger middleware
    app.with(tide::log::LogMiddleware::new());

    // server OpenApi Json
    app.at("/api-docs/openapi.json")
        .get(|_| async move { Ok(Response::builder(200).body(json!(ApiDoc::openapi()))) });

    //serve swagger-ui
    app.at("/swagger-ui/*").get(serve_swagger);

    //user apis
    app.at("/api/user").nest({
        let mut user = tide::with_state(State { db: pool });
        user.at("").put(|_| async { Ok("created User") });
        user.at("/:id").post(|_| async { Ok("Updated User") });
        user.at("/:id").delete(|_| async { Ok("deleted User") });
        user.at("").get(|_| async { Ok("get single user") });
        user.at("/users").get(|_| async { Ok("Get list of users") });
        user
    });

    app.listen("0.0.0.0:8000").await?;

    Ok(())
}

async fn serve_swagger(request: tide::Request<Arc<Config<'_>>>) -> tide::Result<Response> {
    let config = request.state().clone();
    let path = request.url().path().to_string();
    let tail = path.strip_prefix("/swagger-ui/").unwrap();

    match utoipa_swagger_ui::serve(tail, config) {
        Ok(swagger_file) => swagger_file
            .map(|file| {
                Ok(Response::builder(200)
                    .body(file.bytes.to_vec())
                    .content_type(file.content_type.parse::<Mime>()?)
                    .build())
            })
            .unwrap_or_else(|| Ok(Response::builder(404).build())),
        Err(error) => Ok(Response::builder(500).body(error.to_string()).build()),
    }
}

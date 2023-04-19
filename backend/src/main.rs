use clap::Parser;
mod routes;
use routes::user::{create_user, delete_user, get_all_users, get_user, update_user};
use std::env;

#[derive(Clone)]
pub struct State {
    db: sqlx::MySqlPool,
}

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

    //create webserver
    let mut app = tide::with_state(State { db: pool.clone() });

    // add logger middleware
    app.with(tide::log::LogMiddleware::new());
    //user apis
    app.at("/api/user").nest({
        let mut user = tide::with_state(State { db: pool.clone() });
        user.at("").put(create_user);
        user.at("/:id").post(update_user);
        user.at("/:id").delete(delete_user);
        user.at("").get(get_user);
        user.at("/users").get(get_all_users);
        user
    });

    app.listen("0.0.0.0:8000").await?;

    Ok(())
}

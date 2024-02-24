use axum::{
    routing::{get},
    Router,
    response::Json,
};
use serde::{Serialize};

#[derive(Serialize)]
struct IndexData {
    message: &'static str,
}

async fn index() -> Json<IndexData> {
    let data = IndexData { message: "hello from the server" };
    Json(data)
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/index", get(index));

    axum::Server::bind(&"0.0.0.0:3001".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
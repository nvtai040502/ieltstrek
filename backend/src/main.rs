mod db;

use axum::{
    routing::{get, post},
    Router,
    response::Json,
};
use db::Assessment;
use serde::{Serialize};

#[derive(Serialize)]
struct IndexData {
    message: &'static str,
}


// Define the index handler function
async fn index() -> Json<IndexData> {
    let data = IndexData { message: "hello from the server" };
    Json(data)
}

// Define the create_assessment handler function
async fn create_assessment(body: Json<String>) {
    println!("Name: {:#?}", body);
    println!("a");
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        // Define routes for both GET and POST requests
        .route("/index", get(index))
        .route("/create_assessment", post(create_assessment)); // Define the route for creating assessments

    // Start the Axum server
    axum::Server::bind(&"0.0.0.0:3001".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

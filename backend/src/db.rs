use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Assessment {
    pub id: String,
    pub created_at: String, // You may want to use a proper DateTime type here
    pub updated_at: String, // You may want to use a proper DateTime type here
    pub book_name: Option<String>,
    pub image_cover: Option<String>,
    pub name: String,
    pub total_questions: u32,
    pub duration: u32,
    pub is_public: bool,
}

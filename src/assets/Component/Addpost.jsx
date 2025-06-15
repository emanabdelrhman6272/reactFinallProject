import React, { useState } from "react";
import axios from "axios";
import { Box, Stack, TextField, Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

//Addpost
export default function Addpost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newPost = {
      title,
      description,
      image_url: imageUrl,
    };
    if (!title && !description && !imageUrl) {
      alert("where is your post ?!");
      return;
    }

    try {
      await axios.post("http://localhost:3001/posts", newPost);
      alert("Post added successfully!");
      setTitle("");
      setDescription("");
      setImageUrl("");
      navigate("/posts");
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add post.");
    }
  };

  //MUI
  return (
    <Box sx={{ maxWidth: "sm", margin: "auto", padding: "20px" }}>
      <h2>New Post</h2>
      <Card sx={{ padding: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

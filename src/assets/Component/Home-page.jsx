import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  CardMedia,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Homepage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  //get Posts
  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  //Delete Post
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure about delete this Post ?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
      alert("Post deleted Successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error while deleting..");
    }
  };

  //Edit Post
  const handleEdit = async (id) => {
    const newTitle = prompt("Enter New Edit Title ..");
    if (!newTitle) return;

    try {
      await axios.put(`http://localhost:3001/posts/${id}`, { title: newTitle });
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, title: newTitle } : post
        )
      );
      alert("Edited Successfuly !");
    } catch (error) {
      console.error("Error editing post:", error);
      alert("Error while Editing..");
    }
  };

  //MUI
  return (
    <Box
      sx={{
        maxWidth: "sm",
        margin: "auto",
        padding: "20px",
        marginBlock: "50px",
        boxShadow: ".5px .5px 2px gray",
        fontFamily: "Roboto",
        textAlign: "center",
      }}
    >
      <Stack sx={{ padding: 5 }}>
        {posts.map((post, index) => (
          <Card
            key={index}
            sx={{
              width: 360,
              height: 450,
              margin: "auto",
              marginBottom: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <CardHeader
              title={post.title}
              subheader={`Post #${index + 1}`}
              sx={{ paddingBottom: 0 }}
            />
            <CardMedia
              component="img"
              height="180"
              image={post.image_url}
              alt="Post Image"
              sx={{ objectFit: "cover", borderRadius: "4px" }}
            />
            <CardContent sx={{ flexGrow: 1, paddingTop: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                style={{ color: "red" }}
              >
                <FavoriteIcon />
              </IconButton>
              {/* <IconButton aria-label="share">
                <ShareIcon />
              </IconButton> */}
              <IconButton aria-label="edit" onClick={() => handleEdit(post.id)}>
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(post.id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab color="primary" onClick={() => navigate("/add")}>
            <AddIcon />
          </Fab>
        </Box>
      </Stack>
    </Box>
  );
}

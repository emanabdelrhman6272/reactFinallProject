import * as React from "react";
import {
  Box,
  Stack,
  styled,
  CardMedia,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Link,
  Fab,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import { red } from "@mui/material/colors";
import postImage from "./images/postImage1.jpg";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate(); //to navigate pages

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
        <Box sx={{ marginBottom: 3, padding: 2 }}>
          <span
            style={{
              padding: 10,
              borderRadius: 30,
              backgroundColor: "rgb(17, 119, 179)",
              boxShadow: ".5px .5px 2px rgb(17, 119, 179)",
              marginRight: "100px",
              fontFamily: "cursive",
              color: "white",
            }}
          >
            E.S
          </span>

          <span style={{ marginLeft: "18%" }}>
            <Link
              sx={{ paddingRight: 2 }}
              component="button"
              variant="body2"
              onClick={() => navigate("/login")}
            >
              Login
            </Link>
          </span>
          <span>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/register")}
            >
              Register
            </Link>
          </span>
        </Box>

        <Card sx={{ maxWidth: 360, margin: "auto", marginBottom: 3 }}>
          <CardHeader
            title=" Welcome to Meta Child"
            subheader="By/Eman"
            style={{ fontFamily: "fantasy", color: "rgb(100, 59, 127)" }}
          />
          <CardMedia
            component="img"
            height="194"
            image={postImage}
            alt="Post Image"
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Meta Child is a social media platform similar to Facebook but
              specifically designed for children. It caters to their age group
              and focuses on keeping them safe while using the internet.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" style={{ color: "red" }}>
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Stack>
    </Box>
  );
}

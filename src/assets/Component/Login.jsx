import React, { useState } from "react";

import { Box, Stack, TextField, Checkbox, Link, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Login (email,password)
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const check = await axios.get("http://localhost:3001/users", {
        params: { email },
      });

      if (check.data.length === 0) {
        alert("This Email doesn't exists. Please Register first.");
        return;
      }
      const res = await axios.get("http://localhost:3001/users", {
        params: {
          email,
          password,
        },
      });

      //Successfull or UnSuccessfull Login
      if (res.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        alert("Login successful!");
        navigate("/posts");
      } else {
        alert("Email or password is incorrect");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
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
      <Stack spacing={2} sx={{ padding: "20px", borderRadius: "15px" }}>
        <h2
          style={{ fontFamily: "Roboto", color: "black", marginBottom: "30px" }}
        >
          Login
        </h2>

        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "90%" }}
          style={{ margin: "5% auto" }}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "90%", margin: "auto" }}
          style={{ margin: "5% auto" }}
        />

        {/* <Stack>
          <Checkbox sx={{ color: "black" }} />
          Remember me
        </Stack> */}

        <Button
          variant="contained"
          onClick={handleLogin}
          style={{ width: "90%", margin: "3% auto", height: "20%" }}
        >
          Login
        </Button>

        {/* <Stack sx={{ textAlign: "center" }}>
          <Link href="/register" underline="always">
            Don't have account before? Register..
          </Link>
        </Stack> */}
        <Stack sx={{ textAlign: "center" }}>
          <Link component={RouterLink} to="/register" underline="always">
            Don't have account before? Register..
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

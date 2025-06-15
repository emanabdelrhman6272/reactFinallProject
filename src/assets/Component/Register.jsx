import React, { useState } from "react";
import { Box, Stack, TextField, Checkbox, Link, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

//Register (Fullname,email,password)
export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      //check if this email exist before ?
      const check = await axios.get("http://localhost:3001/users", {
        params: { email },
      });

      if (check.data.length > 0) {
        alert("Email already exists. Please use another one.");
        return;
      }

      //check if any of them are empty
      if (!fullname || !email || !password) {
        alert("Please Enter your Fullname ,Email ,Password");
        return;
      }

      await axios.post("http://localhost:3001/users", {
        fullname,
        email,
        password,
      });

      alert("Registration successful!");
      navigate("/posts");
    } catch (error) {
      console.error("Registration error:", error);
      alert("There Exist Server Error");
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
        <h2 style={{ fontFamily: "Roboto", color: "black" }}>Register</h2>

        <TextField
          label="Fullname"
          variant="outlined"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          sx={{ width: "90%", margin: "auto" }}
          style={{ margin: "3% auto" }}
        />

        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "90%", margin: "auto" }}
          style={{ margin: "3% auto" }}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "90%", margin: "auto" }}
          style={{ margin: "3% auto" }}
        />

        <Stack direction="row" alignItems="center" justifyContent="center">
          <Checkbox sx={{ color: "black" }} />
          Remember me
        </Stack>

        <Button
          variant="contained"
          onClick={handleRegister}
          style={{ width: "90%", margin: "5% auto" }}
        >
          Register
        </Button>

        <Stack sx={{ textAlign: "center" }}>
          <Link component={RouterLink} to="/login" underline="always">
            Already have an account? Login
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

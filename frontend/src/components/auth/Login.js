import React,{useState} from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Navbar from "../Navbar.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.post('http://localhost:5000/login', formData)
      if (response.status === 200) {
        toast.success("Login successful",{autoClose:3000});
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', formData.email);
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Error:", error);
    }
    setTimeout(()=>{
      navigate('/home');
    },1000);
  }
  
  return (
    <div>
      <div>{<Navbar />}</div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
              <Typography  variant="body2" sx={{ mr: 1 }}>Not having an account?</Typography>
              <Button
                variant="text"
                sx={{ ml: 1 }}
                onClick={() => navigate("/signup")}
              >
                Create a new account
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;

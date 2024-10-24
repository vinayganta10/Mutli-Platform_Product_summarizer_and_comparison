import React, { useState,useEffect } from "react";
import {
  Avatar,
  TextField,
  Button,
  Box,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import {ToastContainer,toast} from "react-toastify";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Navbar from "./Navbar.js";
import axios from "axios";

const Profile = () => {
  const email = localStorage.getItem("email");
  const[user,setUser] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post('http://localhost:5000/getProfile', {
          email: email
        });
        setUser(response.data.username);
      } catch (error) {
        console.error('Error fetching the profile:', error);
      }
    };
    fetchUser();
  },[]);

  async function clickSave(){
    try {
      await axios.put('http://localhost:5000/profile', {
        username:user,
        email: email
      });
      toast.success("Updated successfully",{autoClose:3000});
    } catch (error) {
      toast.error("Error updating profile",{autoClose:3000});
      console.error('Error fetching the profile:', error);
    }
  }

  const [profileData, setProfileData] = useState({
    "username": "",
    "email": "",
    "profilePhoto": "",
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({
        ...profileData,
        profilePhoto: URL.createObjectURL(file),
      });
    }
  };
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
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Avatar
            src={profileData.profilePhoto}
            sx={{ width: 100, height: 100, mb: 2 }}
          >
            {profileData.profilePhoto ? null : "U"}
          </Avatar>

          <IconButton
            color="primary"
            component="label"
            aria-label="upload picture"
          >
            <PhotoCamera />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handlePhotoUpload}
            />
          </IconButton>

          <Typography component="h1" variant="h5">
            Profile
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={(e)=>setUser(e.target.value)}
              value={user}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              disabled
            />
            <Button onClick={clickSave} fullWidth variant="contained" sx={{ mt: 2 }}>
              Save Profile
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer/>
    </div>
  );
};

export default Profile;

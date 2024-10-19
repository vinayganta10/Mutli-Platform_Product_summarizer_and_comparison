import React, { useState } from "react";
import {
  Avatar,
  TextField,
  Button,
  Box,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Navbar from "./Navbar.js";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    profilePhoto: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

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
            {/* Default Avatar */}
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
              value={profileData.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={profileData.email}
              disabled
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Save Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Profile;

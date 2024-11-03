import React from "react";
import Navbar from "./Navbar.js";
import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Home = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const handleClick = () => {
    if (!token) {
      toast.warning("Please login to continue", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else navigate("/project");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 20px",
          animation: `${fadeIn} 1s ease`,
        }}
      >
        {/* Project Title and Intro */}
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            animation: `${fadeIn} 1.2s ease`,
          }}
        >
          <Typography
            variant="h3"
            color="secondary"
            sx={{ mb: 3, fontWeight: "bold", fontSize: "2.5rem" }}
          >
            Welcome to Product Summarizer & Analyzer
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ mb: 4, maxWidth: "600px" }}
          >
            A tool that provides you with a detailed comparison of products
            across popular platforms like Amazon, Flipkart, and JioMart. Compare
            prices, delivery, ratings, and more to make the best choice!
          </Typography>

          {/* Get Started Button */}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleClick}
            sx={{
              fontSize: "18px",
              padding: "12px 24px",
              backgroundColor: "#9c27b0",
              transition: "transform 0.2s ease",
              "&:hover": {
                backgroundColor: "#7b1fa2",
                transform: "scale(1.1)",
              },
            }}
          >
            Get Started
          </Button>
        </Container>

        {/* Competing Platform Icons */}
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <IconButton sx={{ animation: `${bounce} 1.5s ease-in-out infinite` }}>
            <img
              src={`${process.env.PUBLIC_URL}/amazon.jpeg`}
              alt="Amazon"
              width="60"
              height="60"
            />
          </IconButton>
          <IconButton
            sx={{
              animation: `${bounce} 1.5s ease-in-out infinite`,
              animationDelay: "0.2s",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/flipkart.jpeg`}
              alt="Flipkart"
              width="60"
              height="60"
            />
          </IconButton>
          <IconButton
            sx={{
              animation: `${bounce} 1.5s ease-in-out infinite`,
              animationDelay: "0.4s",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/jiomart.jpeg`}
              alt="JioMart"
              width="60"
              height="60"
            />
          </IconButton>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          color: "white",
          textAlign: "center",
          py: 2,
          animation: `${fadeIn} 2s ease`,
        }}
      >
        <Typography variant="body2" sx={{ mb: 1 }}>
          &copy; {new Date().getFullYear()} Summarizer and Analyzer. All rights reserved.
        </Typography>
        <IconButton
          href="https://github.com/vinayganta10/Mutli-Platform_Product_summarizer_and_comparison"
          sx={{ color: "white" }}
        >
          <GitHubIcon />
        </IconButton>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Home;

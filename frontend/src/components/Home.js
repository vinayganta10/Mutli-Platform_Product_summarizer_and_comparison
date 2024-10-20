import React from "react";
import Navbar from "./Navbar.js";
import { Box, Button, Container, Typography,IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem('token');
    const handleClick=()=>{
        if(!token){
            toast.warning("Please login to continue",{autoClose:3000});
            setTimeout(()=>{
                navigate('/login');
            },3000);
        }
        else navigate('/project');
    }
  return (
    <div>
      <div>{<Navbar />}</div>
      <Box
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: '50px', 
          boxSizing: 'border-box',
          overflow: 'auto',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textAlign: 'center',
            marginTop: '50px',
          }}
        >
          <Typography
            variant="h3"
            color="secondary"
            sx={{ mb: 3, fontWeight: 'bold', fontSize: '2.5rem' }}
          >
            Welcome to Product Summarizer
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleClick}
            sx={{
              fontSize: '18px',
              padding: '12px 24px',
              backgroundColor: '#9c27b0',
              '&:hover': {
                backgroundColor: '#7b1fa2',
              },
            }}
          >
            Get Started
          </Button>
        </Container>

        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            textAlign: 'center',
            padding: '10px 0',
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Summarizer and Analyzer
          </Typography>
          <IconButton
            href="https://github.com/vinayganta10/Mutli-Platform_Product_summarizer_and_comparison"
            sx={{ color: 'white', mt: 1 }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Box>
      <ToastContainer/>
    </div>
  );
};

export default Home;

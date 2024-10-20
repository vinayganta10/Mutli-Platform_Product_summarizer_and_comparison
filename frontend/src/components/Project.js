import React, { useState } from "react";
import Navbar from "./Navbar.js";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Project = () => {
  const [url, setUrl] = useState();
  const [data, setData] = useState();
  const [summary, setSummary] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);

    try {
      const response = await axios.post(
        "http://localhost:5000/scrapper",
        {
          url: url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = response.data;
      setData(resData);
      console.log("Response from backend:", resData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSummarize = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/summarizer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.summary);
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };
  return (
    <div>
      <div>{<Navbar />}</div>
      <Container className="App" maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Enter Product URL
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => {
              setUrl("");
              setData(null);
              setSummary(null);
            }}
          >
            Check Another Product
          </Button>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter Amazon/Flipkart URL"
              variant="outlined"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
      {data && (
        <Box mt={4}>
          <Box
            mb={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant={showDetails ? "contained" : "outlined"}
              onClick={() => setShowDetails(true)}
              sx={{ mr: 2 }}
            >
              Product Details
            </Button>
            <Button
              variant={!showDetails ? "contained" : "outlined"}
              onClick={() => setShowDetails(false)}
            >
              Technical Details
            </Button>
          </Box>

          {showDetails ? (
            <TableContainer
              component={Paper}
              sx={{ marginTop: 4, width: "80%", margin: "0 auto" }}
            >
              <Table sx={{ minWidth: 600 }} aria-label="product details table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Type
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Title
                    </TableCell>
                    <TableCell align="center">{data.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Price
                    </TableCell>
                    <TableCell align="center">{data.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Rating
                    </TableCell>
                    <TableCell align="center">{data.rating}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Delivery Date
                    </TableCell>
                    <TableCell align="center">{data.delivery_date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      EMI Details
                    </TableCell>
                    <TableCell align="center">{data.emi_details}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Warranty
                    </TableCell>
                    <TableCell align="center">{data.warranty}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer
              component={Paper}
              sx={{ marginTop: 4, width: "80%", margin: "0 auto" }}
            >
              <Table
                sx={{ minWidth: 600 }}
                aria-label="technical details table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Type
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(data.technical_details).map(
                    ([key, value], index) => (
                      <TableRow key={index}>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                          {key}
                        </TableCell>
                        <TableCell align="center">{value}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
      {data && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="contained" onClick={handleSummarize}>
            Summarize
          </Button>
        </Box>
      )}
      {summary && (
        <Box
          mt={4}
          p={2}
          sx={{
            margin: "10px auto",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            width: "80%",
          }}
        >
          <Typography
            variant="h6"
            sx={{ display: "flex", justifyContent: "center" }}
            gutterBottom
          >
            Summary:
          </Typography>
          <Typography>{summary}</Typography>
        </Box>
      )}
    </div>
  );
};

export default Project;

import React, { useState } from "react";
import Navbar from "./Navbar.js";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const Project = () => {
  const [url, setUrl] = useState();
  const [imgs, setImgs] = useState("");
  const [data, setData] = useState();
  const [summary, setSummary] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const [keywords, setKeywords] = useState(null);
  const [compare, setCompare] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [name, setName] = useState(null);
  const [selectedComparePlatform, setSelectedComparePlatform] = useState("");

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
      setImgs(resData.url);
      setPlatform(resData.platform);
      setName(resData.title);
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
      setSummary(response.data.summary);
      if (platform !== "jiomart") {
        const keywords = await axios.post(
          "http://localhost:5000/sentiment",
          {
            url: url,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setKeywords(keywords.data);
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  const handleCompare = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:5000/compare",
        {
          name: name,
          platform: selectedComparePlatform,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompare(response.data.compare);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };
  const getIcon = (feedbackType) => {
    if (feedbackType === "POSITIVE")
      return <CheckCircleIcon style={{ color: "green" }} />;
    if (feedbackType === "NEGATIVE")
      return <CancelIcon style={{ color: "red" }} />;
    return <RemoveCircleIcon style={{ color: "orange" }} />;
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
              setKeywords(null);
              setCompare(null);
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
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ mt: 2, width: "200px" }}>
              {" "}
              <InputLabel id="compare-select-label">Compare With</InputLabel>
              <Select
                labelId="compare-select-label"
                id="compare-select"
                value={selectedComparePlatform}
                label="Compare With"
                onChange={(e) => setSelectedComparePlatform(e.target.value)}
              >
                <MenuItem value="amazon" disabled={platform === "amazon"}>
                  Amazon
                </MenuItem>
                <MenuItem value="flipkart" disabled={platform === "flipkart"}>
                  Flipkart
                </MenuItem>
                <MenuItem value="jiomart" disabled={platform === "jiomart"}>
                  Jio Mart
                </MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                disabled={!selectedComparePlatform}
                onClick={handleCompare}
              >
                Compare
              </Button>
            </Box>
          </Box>
          <Box
            mb={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={imgs} alt="product image" loading="lazy" />
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
      {keywords && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={4}
          margin="50px"
        >
          <Typography variant="h5" gutterBottom>
            Most Used Keywords
          </Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            maxWidth="80%"
          >
            {keywords.map((item, index) => {
              const [feedbackType, feedbackText] = item.split("  ");

              return (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    minWidth: 200,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <ListItemIcon>{getIcon(feedbackType)}</ListItemIcon>
                  <ListItemText primary={feedbackText} />
                </Paper>
              );
            })}
          </Box>
        </Box>
      )}
      {compare && (
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
            Comparison of two Platforms
          </Typography>
          <Typography
            variant="body1"
            component="pre"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {<div dangerouslySetInnerHTML={{ __html: compare }} />}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Project;

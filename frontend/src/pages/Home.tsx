import { Box } from "@mui/material";
import React from "react";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh" // Set the height to 100% of the viewport height
    >
      <Box
        sx={{
          flex: 1, // Make this container take up the available space
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
        }}
      >

        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src="robot.png"
            alt="robot"
            style={{ width: "200px", margin: "auto" }}
          />
          <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"
            style={{ width: "200px", margin: "auto" }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;

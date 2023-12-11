import express from "express";

const app = express();

// middlewares
app.use(express.json());

// connection and listeners
app.listen(5000, () => console.log("Server Open.. Project by Sylvia Ratemo"));
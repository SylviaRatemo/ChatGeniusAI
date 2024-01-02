import express, { Request, Response } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = express.Router();

appRouter.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API!" });
  });
appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats

export default appRouter;

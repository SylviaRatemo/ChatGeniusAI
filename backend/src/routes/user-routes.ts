import { Router, Request, Response } from "express";
import {
  getAllUsers,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from "../controllers/user-controllers.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

// userRoutes.get("/", getAllUsers);
userRoutes.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the API!" });
});
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);

userRoutes.get("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default userRoutes;

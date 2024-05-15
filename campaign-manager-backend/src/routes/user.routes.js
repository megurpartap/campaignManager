import { Router } from "express";
import axios from "axios";
import {
  checkRefreshToken,
  generateAppSecretProof,
  getRefreshToken,
} from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";
import { login } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.route("/login").post(login);

userRouter
  .route("/checkRefreshToken")
  .get(
    getRefreshToken,
    generateAppSecretProof,
    checkRefreshToken,
    async (req, res) => {
      res.status(200).json({ message: "Refresh Token is Valid" });
    }
  );

userRouter.route("/").get(async (req, res) => {
  console.log("hello");
  res.status(200).json({ message: "Hello World" });
});
export default userRouter;

import axios from "axios";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateAppSecretProof = async (req, res, next) => {
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const refreshToken = req.auth.decoded.access_token;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized Attempt",
    });
  }

  const hmac = await crypto.createHmac("sha256", appSecret);
  const appsecret_proof = await hmac.update(refreshToken).digest("hex");
  req.auth = {
    ...req.auth,
    appsecret_proof,
  };
  next();
};

export const getRefreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.rt;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized Attempt",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.auth = {
      ...req.auth,
      decoded,
    };
    next();
  } catch (error) {
    console.log(error.response.data);
    res.status(500).json(error.response.data);
  }
};

export const checkRefreshToken = async (req, res, next) => {
  try {
    const token = req.auth.decoded.access_token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized Attempt",
      });
    }
    const response = await axios.get(
      `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${token}&appsecret_proof=${req.auth.appsecret_proof}`
    );
    if (!response.data.data.is_valid) {
      return res.status(401).json({
        message: "Refresh Token is Not valid",
      });
    }
    res.status(200).json({ message: "Refresh Token is Valid" });
  } catch (error) {
    res.status(500).json(error);
  }
};

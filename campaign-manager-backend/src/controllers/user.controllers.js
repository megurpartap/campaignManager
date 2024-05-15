import axios from "axios";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { userId, fullname } = req.body;
    const user = await User.findOne({ userId });
    const response = await axios.get(
      `${process.env.FACEBOOK_GRAPH_API}/${process.env.GRAPH_API_VERSION}/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&grant_type=fb_exchange_token&fb_exchange_token=${req.body.accessToken}`
    );
    const { access_token, token_type, expires_in } = response.data;
    const tokenInfo = jwt.sign(
      {
        refreshToken: access_token,
        token_type,
        expires_in,
      },
      process.env.JWT_SECRET
    );
    if (user) {
      res
        .cookie(
          "rt",
          tokenInfo,
          {
            sameSite: "none",
            secure: true,
            httpOnly: true,
          },
          { expires_in: 1000 * 60 * 60 * 24 * 7 }
        )
        .status(200)
        .json({ message: "Refresh Token Generated and Saved", tokenInfo });
    }

    const newUser = new User({
      fullname,
      userId,
    });
    await newUser.save();
    return res.status(200).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// backend/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // make sure User.js exists

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, message: "Not authorized" });
    }
  } else {
    return res.status(401).json({ success: false, message: "No token found" });
  }
};

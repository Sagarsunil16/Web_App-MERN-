import jwt from "jsonwebtoken" // Adjust with your User model
import User from "../models/userModel.js";
// Middleware to check if the user is authenticated by token
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.access_token; // Read token from cookies
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to the request object for future use
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token or not authenticated" });
  }
};

export default isAuthenticated

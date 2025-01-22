import jwt from "jsonwebtoken"
export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        console.log("No token found");
        return res.status(401).json("You need to login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token Verification Error:", err);
        return res.status(403).json("Token is not valid");
    }
};
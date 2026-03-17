import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    

    const token = authHeader;

    console.log(token)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded)

    req.user = decoded;

    console.log(req.user)

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
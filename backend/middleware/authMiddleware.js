import jwt from "jsonwebtoken";

export default function (req, res, next) {
  // Let CORS preflight requests pass through without requiring auth
  if (req.method === "OPTIONS") return next();
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
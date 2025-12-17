import jwt from "jsonwebtoken";
import { findUserById } from "../models/user-model.js";
import { isTokenBlacklistedModel } from "../models/blacklist-model.js";

// Helper functions
function createUnauthorizedError(message = "server.auth.errors.unauthorized") {
  const err = new Error(message);
  err.statusCode = 401;
  return err;
}

async function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}


// Middleware: Authenticate tokens
export async function authenticateAccessToken(req, res, next) {
  try {
    const header = req.get('Authorization') || req.headers?.authorization;
    const headerToken = header?.split(/\s+/)[1]?.trim();
    const accessToken = headerToken ?? req.cookies?.jwt_access;
    
    if (!accessToken) throw createUnauthorizedError("server.auth.errors.session_expired");
    

    if (await isTokenBlacklistedModel(accessToken)) throw createUnauthorizedError("server.auth.errors.session_expired");

    const decoded = await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET);
    
    if (!decoded) throw createUnauthorizedError("server.auth.errors.session_expired");
    
    const user = await findUserById(decoded.userId);
    
    if (!user) throw createUnauthorizedError("server.auth.errors.session_expired");
  
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("jwt_access"); 
    next(err);
  }
}
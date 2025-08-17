import jwt from "jsonwebtoken";
import { findUserById } from "../models/user-model.js";
import { isTokenBlacklistedModel } from "../models/blacklist-model.js";
import { refreshTokenService } from "../services/auth-service.js";

// Helper functions
function createUnauthorizedError(message = "Unauthorized access") {
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


// Middleware: Redirect logged-in users away from login/register pages
export async function redirectLoggedInMiddleware(req, res, next) {
  try {
    const token = req.cookies.jwt_access;
    const decoded = token ? await verifyToken(token, process.env.JWT_ACCESS_SECRET) : null;
    if (decoded) {
      const user = await findUserById(decoded.userId);
      if (user) return res.redirect("/to-do/all");
    }
    next();
  } catch (err) {
    next(err);
  }
}

// Middleware: Authenticate tokens
export async function authenticateAccessToken(req, res, next) {
  try {
    const header = req.get('Authorization') || req.headers?.authorization;
    const headerToken = header?.split(/\s+/)[1]?.trim();
    const accessToken = headerToken ?? req.cookies?.jwt_access;
    
    if (!accessToken) throw createUnauthorizedError("Oturumunuzun süresi doldu.");
    

    if (await isTokenBlacklistedModel(accessToken)) throw createUnauthorizedError("Oturumunuzun süresi doldu.");

    const decoded = await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET);
    
    if (!decoded) throw createUnauthorizedError("Oturumunuzun süresi doldu.");
    
    const user = await findUserById(decoded.userId);
    
    if (!user) throw createUnauthorizedError("Oturumunuzun süresi doldu.");
  
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("jwt_access"); 
    next(err);
  }
}


// Middleware: Authenticate tokens for web
export async function authenticateAccessTokenWeb(req, res, next) {
  try {
    let accessToken = req.cookies.jwt_access;
  
    if (!accessToken) {
      const refreshToken = req.cookies.jwt_refresh;
      const response =  await refreshTokenService(refreshToken);
      accessToken = response.newAccessToken;

      if (!accessToken) throw createUnauthorizedError("Oturumunuzun süresi doldu.");

      res.cookie('jwt_access', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 1000 * 60 * 15 });
    }
    
    if (await isTokenBlacklistedModel(accessToken)) throw createUnauthorizedError("Oturumunuzun süresi doldu.");

    const decoded = await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET);
    
    if (!decoded) throw createUnauthorizedError("Oturumunuzun süresi doldu.");

    
    const user = await findUserById(decoded.userId);
    
    if (!user) throw createUnauthorizedError("Oturumunuzun süresi doldu.");
 
  
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

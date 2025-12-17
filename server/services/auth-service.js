import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, findUserByEmail, findUserById } from '../models/user-model.js';
import { addTokenToBlacklistModel, isTokenBlacklistedModel } from '../models/blacklist-model.js';

dotenv.config();

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
  });
}   

function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    });
}


// Register
export async function userRegisterService(first_name, last_name, email, password, confirmPassword) {
  const existing = await findUserByEmail(email);
  
  // Password length control
  if(password.length < 8) {
    const err = new Error("server.auth.errors.password_min");
    err.statusCode = 400;
    throw err;
  }

  // Password match
  if (password !== confirmPassword) {
    const err = new Error("server.auth.errors.password_mismatch");
    err.statusCode = 400;
    throw err;
  }

  // Email check
  else if (existing) {
    const err = new Error("server.auth.errors.email_exists");
    err.statusCode = 400;
    throw err;
  }

  // Pass hash
  const hashed = await bcrypt.hash(password, 10);
  const userData = {
    first_name: first_name,
    last_name:  last_name,
    email:      email,
    password:   hashed,
  };

  const userId = await createUser(userData);

  return { userId };
}


// Login
export async function userLoginService(email, incomingPassword) {
  const user = await findUserByEmail(email);

  // User check
  if (!user) { 
    const err = new Error("server.auth.login.invalid_credentials");
    err.statusCode = 401;
    throw err;
  }

  // Pass check
  const valid = await bcrypt.compare(incomingPassword, user.password);
  if (!valid) {
    const err = new Error("server.auth.login.invalid_credentials");
    err.statusCode = 401;
    throw err;
  }

  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });
  return { first_name: user.first_name, last_name: user.last_name, accessToken, refreshToken };
}


// Logout
export async function userLogoutService(accessToken, refreshToken) {

  // Add access token to blacklist
  if (accessToken) {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    const expiresAt = new Date(decoded.exp * 1000);
    await addTokenToBlacklistModel(accessToken, expiresAt);
  }
  // Add refresh token to blacklist
  if (refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const expiresAt = new Date(decoded.exp * 1000);
    await addTokenToBlacklistModel(refreshToken, expiresAt);
  }
}


// Refresh Token
export async function refreshTokenService(refreshToken) {
  if (!refreshToken) {
    throw new Error("server.auth.errors.session_expired");
  }
  try {

    const isBlacklisted = await isTokenBlacklistedModel(refreshToken);
    if (isBlacklisted) {
      throw new Error("server.auth.errors.session_expired");
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await findUserById(decoded.userId);
    
    if (!user) {
      throw new Error("server.auth.errors.session_expired");
    }

    const newAccessToken = generateAccessToken({ userId: user.id });

    return { newAccessToken, user };
  } catch (error) {
    throw new Error("server.auth.errors.session_expired");
  }
}

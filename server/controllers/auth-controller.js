import { userRegisterService, userLoginService, userLogoutService, refreshTokenService } from '../services/auth-service.js';

// Register 
export async function userRegisterController(req, res, next) {
  try {
    const { first_name, last_name, email, password, confirmPassword } = req.body;

    await userRegisterService( first_name, last_name, email, password, confirmPassword );
    return res.status(201).json({ success: true, messageKey: "server.auth.register.success" });

  } catch (err) {
    next(err); 
  }
}

// Login
export async function userLoginController(req, res, next) {
  try {
    const { email, password, platform } = req.body;
    const { first_name, last_name, accessToken, refreshToken } = await userLoginService(email, password);
    
    if (platform === "w") {
      res.cookie('jwt_access', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 1000 * 60 * 15 });
      res.cookie('jwt_refresh', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 1000 * 60 * 60 * 24 * 7 });
      return res.json({ success: true, first_name, last_name, email });
    }
    
    return res.json({ success: true, first_name, last_name, email, accessToken, refreshToken });

  } catch (err) {
    next(err);
  }
}

// Logout
export async function userLogoutController(req, res, next) {  
  try {
    if (req.body.platform === "w") {
      var accessToken = req.cookies.jwt_access;
      var refreshToken = req.cookies.jwt_refresh;
    }else {
      var accessToken  = req.headers.authorization.split(' ')[1];
      var refreshToken = req.body.refreshToken;
    }

    await userLogoutService(accessToken, refreshToken);

    if (req.body.platform === "w") {
      res.clearCookie('jwt_access');
      res.clearCookie('jwt_refresh');
    }
    return res.json({ success: true, messageKey: "server.auth.logout.success" });

  } catch (err) {
    if (req.body.platform === "w") {
      res.clearCookie('jwt_access');
      res.clearCookie('jwt_refresh');
    }
    next(err);
  }
}

// Access token
export async function checkAccessTokenController(req, res, next) {
  const user = req.user;
  const { first_name, last_name, email } = user;
  return res.json({ success: true, first_name, last_name, email });
}

// Access token renewal
export async function refreshTokenController(req, res, next) {
  try {
    const refreshToken = req.body?.refreshToken ?? req.cookies.jwt_refresh;

    const { newAccessToken, user } = await refreshTokenService(refreshToken);

    const { first_name, last_name, email } = user;

    if (!req.body?.refreshToken) {
      res.cookie('jwt_access', newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 1000 * 60 * 15 });
      return res.json({ success: true, first_name, last_name, email });
    }
    return res.json({ success: true, newAccessToken, first_name, last_name, email });
  } catch (err) {
    next(err);
  }
}



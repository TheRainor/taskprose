export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Sunucuda bir hata oluştu";

  // Just return JSON to API routes
  if (req.originalUrl.startsWith("/api")) {
    return res.status(statusCode).json({ success: false, message });
  }

  // Render template for all other routes (view routes)
  res.clearCookie("jwt_access");
  res.clearCookie("jwt_refresh");
  return res.status(statusCode).redirect("/");
}

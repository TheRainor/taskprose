export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Sunucuda bir hata oluştu";

  if (req.originalUrl.startsWith("/api")) {
    return res.status(statusCode).json({ success: false, message });
  }
}

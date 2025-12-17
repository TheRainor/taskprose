export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  const message = err.message || "An error occurred on the server";
  const messageKey = err.messageKey || err.message || "server.errors.internal";

  if (req.originalUrl.startsWith("/api")) {
    return res.status(statusCode).json({ success: false, message, messageKey });
  }
}

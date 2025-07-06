const adminCheck = (req, res, next) => {
  const secret = req.headers["x-admin-secret"];
  console.log({ secret });
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = adminCheck;

module.exports = (req, res) => {
  res.status(200).json({
    region: process.env.VERCEL_REGION || "local",
    runtime: process.version,
    greeting: process.env.GREETING || "GREETING env var not set",
    requestId: req.headers["x-vercel-id"] || null,
    time: new Date().toISOString(),
  });
};
 

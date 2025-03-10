module.exports = {
    origin:process.env.ALLOWED_ORIGINS.split(' '),
    exposedHeaders: ['Content-Disposition'],
    credentials:true
  }
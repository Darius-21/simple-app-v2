module.exports = {
  jwtSecret: process.env.JWT_SECRET || '478eae69-73c9-4fce-a41e-652131f37864',
  jwt: {
    "expiresIn": "1d"
  }
};
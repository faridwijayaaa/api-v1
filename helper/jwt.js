const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

function generatorToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET);
  return token;
}

function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.SECRET);
  return decoded;
}

function hashPassword(password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { generatorToken, verifyToken, hashPassword, comparePassword };

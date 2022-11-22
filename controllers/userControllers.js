const db = require("../config/db");
const bcrypt = require("bcrypt");
const {
  hashPassword,
  generatorToken,
  verifyToken,
  verifyHashing,
} = require("../helper/jwt");

class userControllers {
  // ! REGISTER
  static async register(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: "register failed" });
      }

      const hash = hashPassword(password);

      await db.query(`INSERT INTO users (email, password) VALUES ($1, $2);`, [
        email,
        hash,
      ]);

      return res.status(201).json({
        msg: "Register successfully",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // ! LOGIN
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: "email or password is missing" });
      }

      let userData = await db.query(
        "SELECT * FROM users WHERE email = ($1) AND password = ($2);",
        [email, password]
      );

      const existingUser = await userData["rows"][0];

      if (!existingUser) {
        return res.status(404).json({ msg: existingUser });
        // } else if (existingUser.password != password) {
        // return res.status(404).json({ msg: "password is wrong" });
      }

      // const doesPasswordMatch = await bcrypt.compare(
      //   password,
      //   existingUser.password
      // );

      // if (!doesPasswordMatch) {
      //   return res.status(401).json({ msg: "password did not match" });
      // }

      const token = generatorToken({
        id: existingUser.id,
        email: existingUser.email,
      });

      return res.status(200).json({ token: token });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getDataByToken(req, res) {
    try {
      const token = req.headers["x-access-token"];
      const userDecoded = verifyToken(token);

      if (userDecoded) {
        return res.status(201).json({
          id: userDecoded.id,
          email: userDecoded.email,
        });
      } else {
        return res.status(404).json({ msg: "404" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = userControllers;

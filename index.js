const express = require("express");
const cors = require("cors");
const routes = require("./router");
// const cookieParser = require("cookie-parser");
const cookieSession = require("express-session");
require("dotenv").config();

const app = express();

const sessionConfig = {
  name: `monster`,
  secret: process.env.SESSION_SECRET, // secret that makes the cookie effective
  cookie: {
    maxAge: 60 * 1000, // time span of the cookie
    secure: false, // for production set to true for http only access
    httpOnly: true, // true means no access from javascript
  },
  resave: false,
  saveUnititialized: true, // GDPR laws user has to give content
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieSession(sessionConfig));

app.use("/", routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const routes = require("./router");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});

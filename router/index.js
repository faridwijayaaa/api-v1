const express = require("express");
const userControllers = require("../controllers/userControllers");
const restricted = require("../auth/restricted-middleware");
const router = express.Router();

router.post("/users/register", userControllers.register);
router.post("/users/login", userControllers.login);

router.get("/datas", restricted, userControllers.getDataByToken);

module.exports = router;

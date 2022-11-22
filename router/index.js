const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

router.post("/users/register", userControllers.register);
router.post("/users/login", userControllers.login);

router.get("/datas", userControllers.getDataByToken);

module.exports = router;

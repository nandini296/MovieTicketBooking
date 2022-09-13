const router = require("express").Router();

const { register } = require("../controllers/userControllers");

router.post("/register", register);

module.exports = router;

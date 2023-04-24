const router = require("express").Router();
const authController = require("./controllers/authControllers");

router.post("/signup",authController.postSignup);

router.put("/signup",authController.putSignup);

router.post("/login",authController.postLogin);


module.exports = router;
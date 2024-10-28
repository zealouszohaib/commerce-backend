const router = require("express").Router();

const { authenticate } = require("../middlewares/authenticate");

const { signUp, loginController, me } = require("../controller/auth");

router.post("/register", signUp);
router.post("/login", loginController);
router.get("/me", authenticate, me);

module.exports = router;
3;

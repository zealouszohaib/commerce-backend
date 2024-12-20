const router = require("express").Router();
const authRouter = require("./auth");
const productsRouter = require("./products");
const orderRouter = require("./order");
const userRouter = require("./users");
const home = require("../controller/home");

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.get("/ping", home);


module.exports = router;

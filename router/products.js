const router = require("express").Router();

const {getAllProducts,getProductById } = require("../controller/products.js");

router.get("/", getAllProducts);
router.get("/:id", getProductById);


module.exports = router;

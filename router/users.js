const router = require("express").Router();

const {getAllUsers,getUserByID } = require("../controller/user.js");

router.get("/", getAllUsers);
router.get("/:id", getUserByID);


module.exports = router;

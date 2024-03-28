const express = require("express");
const users = require("../controllers/user.controller");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
    .get(users.findAll)
    // .post(users.create)
    .delete(users.deleteAll);

router.route("/login").post(users.login);
router.route("/register").post(users.create);


// router.route("/cart").post(users.addCart);
// router.route("/cart").get(users.findAllCart);

 router.route("/:id")
    .get(users.findOne)
    .put(users.update)
    .delete(users.delete);

module.exports = router;
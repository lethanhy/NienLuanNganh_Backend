const express = require("express");
const docgia = require("../controllers/docgia.controller");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.route("/")
    .get(docgia.findAll)
    // .post(users.create)
    .delete(docgia.deleteAll);

router.route("/login").post(docgia.login);
router.route("/Add").post(docgia.create);


router.route("/cart").post(docgia.addCart);
// router.route("/cart").get(users.findAllCart);

 router.route("/:id")
    .get(docgia.findOne)
    .put(docgia.update)
    .delete(docgia.delete);

module.exports = router;
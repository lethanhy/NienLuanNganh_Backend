const express = require("express");
const nhanvien = require("../controllers/nhanvien.controller");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.route("/")
    .get(nhanvien.findAll)
    // .post(users.create)
    .delete(nhanvien.deleteAll);

router.route("/login").post(nhanvien.login);
router.route("/Add").post(nhanvien.create);


// router.route("/cart").post(users.addCart);
// router.route("/cart").get(users.findAllCart);

 router.route("/:id")
    .get(nhanvien.findOne)
    .put(nhanvien.update)
    .delete(nhanvien.delete);

module.exports = router;
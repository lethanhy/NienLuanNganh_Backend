const express = require("express");
const carts = require("../controllers/cart.controller");

const router = express.Router();

router.route("/")
    .get(carts.findcart)
    // .get(carts.findAll)
    // .post(contacts.create)
    // .delete(contacts.deleteAll);

router.route("/add")
    .post(carts.addCart);

router.route("/:id")
    // .get(carts.findOne)
//     .put(contacts.update)
    .delete(carts.delete);

module.exports = router;
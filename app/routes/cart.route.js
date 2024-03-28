const express = require("express");
const carts = require("../controllers/cart.controller");

const router = express.Router();

router.route("/")
    .get(carts.findAll)
    // .post(contacts.create)
    // .delete(contacts.deleteAll);

// router.route("/favorite")
//     .get(contacts.findAllFavorite);

router.route("/:id")
//     .get(contacts.findOne)
//     .put(contacts.update)
    .delete(carts.delete);

module.exports = router;
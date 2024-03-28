const express = require("express");
const orders = require("../controllers/order.controller");

const router = express.Router();

router.route("/")
    .get(orders.findAll)
    .post(orders.create)
    // .delete(contacts.deleteAll);

// router.route("/favorite")
//     .get(contacts.findAllFavorite);

// router.route("/:id")
//     .get(contacts.findOne)
//     .put(contacts.update)
//     .delete(contacts.delete);

module.exports = router;
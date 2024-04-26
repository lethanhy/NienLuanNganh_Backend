const express = require("express");
const theodoimuonsach = require("../controllers/theodoimuonsach.controller");

const router = express.Router();

router.route("/")
    .get(theodoimuonsach.findAll)
    // .post(theodoimuonsach.create)
    // .delete(contacts.deleteAll);

router.route("/")
    .post(theodoimuonsach.addOrder);

// router.route("/:id")
//     .get(contacts.findOne)
//     .put(contacts.update)
//     .delete(contacts.delete);

module.exports = router;
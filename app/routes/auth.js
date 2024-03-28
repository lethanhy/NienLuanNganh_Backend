const express = require("express").Router();
const User = require("../controllers/user.controller");


//REGISTER
router.post("/login" , (req, res) => {
    try {

    
    const user = new User.findOne({ username: req.body.username });
    !user && res.status(401).json("Sai tên user")

    password !== req.body.password && res.status(401).json("sai password")

    res.status(200).json(user);


    }catch (error){
        return next(
            new ApiError(500, "An error occurred while removing all contacts"));

    }


 });



module.exports = router;

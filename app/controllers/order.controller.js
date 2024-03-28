const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const OrderService = require("../services/order.service");

// Create and Save a new Contact
exports.create = async (req, res, next) => {
    // if (!req.body?.user) {
    //     return next(new ApiError(400, "Name can not be empty"));
    
    // }
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.create(req.body);
        res.status(200).json(document); 
        // return res.send(document);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const orderService = new OrderService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await orderService.findByName(name);
        } else {
            documents = await orderService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};
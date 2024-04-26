const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const TheodoimuonsachService = require("../services/theodoimuonsach.service");

// Create and Save a new Contact
exports.create = async (req, res, next) => {
    // if (!req.body?.user) {
    //     return next(new ApiError(400, "Name can not be empty"));
    
    // }
    try {
        const theodoimuonsachService = new TheodoimuonsachService(MongoDB.client);
        const document = await theodoimuonsachService.create(req.body);
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
        const theodoimuonsachService = new TheodoimuonsachService(MongoDB.client);
        const { tendocgia } = req.query;
        if (tendocgia) {
            documents = await theodoimuonsachService.findByName(name);
        } else {
            documents = await theodoimuonsachService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.addOrder = async (req, res, next) => {
    try {
        const theodoimuonsachService = new TheodoimuonsachService(MongoDB.client);
        const theodoimuonsach = req.body;

        const addOrder = await theodoimuonsachService.create(theodoimuonsach);
        return res.json(addOrder);
    } catch (error) {
        return next(new ApiError(500, `Error adding item to cart: ${error.message}`));
    }
};

const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const CartService = require("../services/cart.service");

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const cartService = new CartService(MongoDB.client);
        const { userId } = req.query;
        if (userId) {
            documents = await cartService.findById(userId);
        } else {
            documents = await cartService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

//Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404,"Contact was deleted successfully" ));
        }
        return res.send({ message:"Contact not found" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        );
    }
}
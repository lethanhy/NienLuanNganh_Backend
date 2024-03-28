const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const CategoryService = require("../services/category.service");


// exports.create = (req, res) => {
//     res.send({ message: "create handler" });
// };

// Create and Save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    
    }
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.create(req.body); 
        return res.send(document);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

// exports.findAll = (req, res) => {
//     res.send({ message: "findAll handler "});
// };
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await categoryService.findByName(name);
        } else {
            documents = await categoryService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

// exports.findOne = (req, res) => {
//     res.send({ message: "findOne handler "});
// };
// Find a single contact with an id
exports.findOne = async (req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};

// exports.update = (req, res) => {
//     res.send({ message: "update handler "});
// };
//Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.update(req.params.id, req.body);
        if (!document) {
            return res.send({message: "Contact was updated successfully" });
        }
        return next(new ApiError(404, "Contact not found"));
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

// exports.delete = (req, res) => {
//     res.send({ message: "delete handler "});
// };
//Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.delete(req.params.id);
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

// exports.deleteAll = (req, res) => {
//     res.send({ message: "deleteAll handler "});
// };
// Delete all contacts of user from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const deletedCount = await categoryService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};

// exports.findAllFavorite = (req, res) => {
//     res.send({ message: "findAllFavorite handler "});
// };
// Find all favorite contacts of user
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const documents = await categoryService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while rtrieving favorite contacts"
            )
        );
    }
}

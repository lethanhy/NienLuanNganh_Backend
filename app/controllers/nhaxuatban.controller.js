const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ProductService = require("../services/sach.service");
const CartService = require("../services/cart.service");
const NhaxuatbanService = require("../services/nhaxuatban.service");

// Create and Save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.ten) {
        return next(new ApiError(400, "Name can not be empty"));
    
    }
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const document = await nhaxuatbanService.create(req.body); 
        return res.send(document);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

// exports.findOne = async (_req, res, next) => {
//     try {
//         const productService = new ProductService(MongoDB.client);
//         const categoryService = new CategoryService(MongoDB.client);

//         const categoryName = await categoryService.findById(_req.params.id)
//         const documents = await productService.findByCategoryName(categoryName.name);
//         return res.send(documents);

//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while creating the contact")
//         );
//     }
// }

// exports.findAllCategory = (req, res) => {
//     res.send({ message: "findAll handler "});
// };
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await nhaxuatbanService.findByName(name);
        } else {
            documents = await nhaxuatbanService.find({});
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
// exports.findOne = async (req, res, next) => {
//     try {
//         const nhaxuatbanService = new CategoryService(MongoDB.client);
//         const productService = new ProductService(MongoDB.client);
//         const document = await categoryService.findById(req.params.id);
//         if (!document) {
//             return next(new ApiError(404, "Contact not found"));
//         } else {
//             const products = await productService.findByCategory(document.name);

//             if (!products || products.length === 0) {
//                 return next(new ApiError(404, "No products found for this category"));
//             }
//             return res.json(products);
//             // return res.json({ document, products });
//         }
//         // return res.send(document);
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500,
//                 `Error retrieving contact with id=${req.params.id}`
//             )
//         );
//     }
// };

// exports.update = (req, res) => {
//     res.send({ message: "update handler "});
// };
//Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const document = await nhaxuatbanService.update(req.params.id, req.body);
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
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const document = await nhaxuatbanService.delete(req.params.id);
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
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const deletedCount = await nhaxuatbanService.deleteAll();
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
// exports.findAllFavorite = async (_req, res, next) => {
//     try {
//         const categoryService = new CategoryService(MongoDB.client);
//         const documents = await categoryService.findFavorite();
//         return res.send(documents);
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500,
//                 "An error occurred while rtrieving favorite contacts"
//             )
//         );
//     }
// }


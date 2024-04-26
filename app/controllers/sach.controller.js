const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const SachService = require("../services/sach.service");
const CartService = require("../services/cart.service");
const CategoryService = require("../services/nhaxuatban.service");
const multer = require("multer");

// Create and Save a new Contact
exports.create = async (req, res, next) => {
    // if (!req.body?.name) {
    //     return next(new ApiError(400, "Name can not be empty"));
    
    // }
    try {
        const sachService = new SachService(MongoDB.client);
        // const imagePath = req.file.findname;
        const document = await sachService.create(req.body); 
        return res.send(document);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const sachService = new SachService(MongoDB.client);
        const { tensach } = req.query;
        if (tensach) {
            documents = await sachService.findByName(tensach);
        } else {
            documents = await sachService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Not found"));
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

// exports.update = async (req, res, next) => {
//     if (Object.keys(req.body).length === 0) {
//         return next(new ApiError(400, "Data to update can not be empty"));
//     }

//     try {
//         const sachService = new SachService(MongoDB.client);
//         const document = await sachService.update(req.params.id, req.body);
//         if (!document) {
//            return next(new ApiError(404, "Not found"));
//         }
//         return res.send({message: "Updated successfully" });
        
//     } catch (error) {
//         return next(
//             new ApiError(500, `Error updating contact with id=${req.params.id}`)
//         );
//     }
// };

exports.update = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return next(new ApiError(400, "Data to update cannot be empty"));
        }

        const sachService = new SachService(MongoDB.client);
        const updatedDocument = await sachService.update(req.params.id, req.body);

        if (!updatedDocument) {
           return res.status(200).json({ message: "Product updated successfully", updatedDocument });
        }
         return next(new ApiError(404, "Product not found"));

        
    } catch (error) {
        console.error('Error updating product:', error);
        return next(new ApiError(500, `Error updating product with id=${req.params.id}: ${error.message}`));
    }
};
//Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404,"Product was deleted successfully" ));
        }
        return res.send({ message:"Product not found" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete Product with id=${req.params.id}`
            )
        );
    }
}

// Delete all contacts of user from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const deletedCount = await sachService.deleteAll();
        return res.send({
            message: `${deletedCount} products were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all products")
        );
    }
};

// Find all favorite contacts of user
// exports.findAllFavorite = async (_req, res, next) => {
//     try {
//         const productService = new ProductService(MongoDB.client);
//         const documents = await productService.findFavorite();
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

exports.addCart = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const sachService = new SachService(MongoDB.client);
        const { userId, sachId, masach, tensach, image, soquyen, dongia, namxuatban, tacgia } = req.body;

        let cart = await cartService.findByuserId({ userId: userId });
        console.log(cart)

        //  const cartItem = {
        //     productId :productId,
        //     name: name,
        //     image:image,
        //     quantity:quantity,
        //     price :price,
        //     created_at: new Date(),
        // };

        
        if (!cart) {
           const newcart = await cartService.addCart({
                userId,
                sach: [{ sachId, masach,tensach, image, soquyen, dongia, namxuatban, tacgia }], // Assuming `product` contains necessary information
            });
            return res.status(200).json({ success: true, data: newcart });

        } else {
        //     // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingProduct = cart.sach.find(item => item.sachId === sachId);

            if (existingProduct) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                existingProduct.soquyen += soquyen;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                cart.sach.push({ sachId, masach,tensach, image, soquyen, dongia, namxuatban, tacgia });
            }

            // Cập nhật giỏ hàng
            await cartService.update(cart._id, cart);
            return res.status(200).json({ success: true, data: cart });
        }
    } catch (error) {
        return next(new ApiError(500, `Error adding item to cart: ${error.message}`));
    }
};





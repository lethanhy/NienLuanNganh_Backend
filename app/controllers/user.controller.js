const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const CartService = require("../services/cart.service");
const jwt = require("jsonwebtoken");
const ProductService = require("../services/product.service");



// Create and Save a new Contact
exports.create = async (req, res, next) => {
    // if (!req.body?.username) {
    //     return next(new ApiError(400, "Name can not be empty"));
    
    // }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body); 
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
        const userService = new UserService(MongoDB.client);
        const { username } = req.query;
        if (username) {
            documents = await userService.findByName(username);
        } else {
            documents = await userService.find({});
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
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

//Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        if (!document) {
            return res.send({message: "Updated successfully" });
        }
        return next(new ApiError(404, "Not found"));
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

//Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404,"Deleted successfully" ));
        }
        return res.send({ message:"Not found" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        );
    }
}

// Delete all contacts of user from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({
            message: `${deletedCount} Deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};

// exports.login = async (req, res, next) => {
//     try {
//         const data= req.body;
//         const userService = new UserService(MongoDB.client);
//         const user = await userService.findUserLogin({ phone: data.phone});

//         if(!user) {
//             return next(new ApiError(404,"user not found" ));
//         }

//         if(data.password !== user.password) {
//             return res.send({
//                 message: `sai mật khẩu`,
//             })
//         }
//         if(user) {
//             return res.send({
//                 message: `Thành công`,
//             })
//         }
//     } catch (err) {
//         return next(
//             new ApiError(500, "An error occurred while removing all contacts")
//         );
//     }
// }

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userService = new UserService(MongoDB.client);
        const user = await userService.findUserLogin({ username });

        if(!user) {
            res.status(401).json("Sai tên user")
        }

        password !== user.password && res.status(401).json("sai password")

        // const accessToken = jwt.sign({
        //     id: user._id,
        //     isAdmin: user.isAdmin,

        // },
        //  process.env.JWT_SECRET,
        //  {expiresIn: "3d"}
        //  );
        //  const {...others } = user._doc;
        // if(user){
        //      res.send('/');
        // }

        res.status(200).json(user);
        // res.status(200).json("thành công")
       
    }catch (error){
        return next(
            new ApiError(500, "lỗi"));
    }
 };






exports.addCart =  async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const cartService = new CartService(MongoDB.client);
        const productService = new ProductService(MongoDB.client);

        // const productId = req.product.product._id;
        // const productId = req.body
        // const cartItems = [];
        // const cartItem = {
        //     quantity:data,
        //     price: data,
        // }
        // cartItems.push(cartItem);

        const addCart = await cartService.create(req.body);
        res.json(addCart);

        

        // const cartItem = {
        //     product: data.product,
        //     quanlity: data.quanlity,
        //     price: data.price,

        // };
        // cartItems.push(cartItem)

        // const addCart = await userService.addCart(id, cartItems);

        // const addtocart = await cartService.create(id, cartItem);

        // return res.json(addtocart);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );

    }
};


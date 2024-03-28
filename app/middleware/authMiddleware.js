const User = require('../services/user.service');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const ApiError = require("../api-error");
const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if(req?.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        } catch (error) {
            return next(new ApiError(400, "Vui lòng đăng nhập lại!"));
        }
    } else {
        return next(new ApiError(400, "Không đúng"));
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } =req.user;
    const adminUser = await User.findOne({ email });
    if(adminUser.role !== 'admin') {
        return next(new ApiError(400, "Không phải quản trị viên"));
    } else {
        next();
    }
});

module.exports = { authMiddleware, isAdmin };



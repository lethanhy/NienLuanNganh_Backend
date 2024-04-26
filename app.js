const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const docgiaRouter = require("./app/routes/docgia.route");
const sachRouter = require("./app/routes/sach.route");
const theodoimuonsachRouter = require("./app/routes/theodoimuonsach.route");
const cartsRouter = require("./app/routes/cart.route");
const nhanvienRouter = require("./app/routes/nhanvien.route");
const nhaxuatbanRouter = require("./app/routes/nhaxuatban.route");
const ApiError = require("./app/api-error");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
// const verifyToken = require()

const app = express();




app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to store." });
});

app.use("/api/contacts", contactsRouter);
app.use("/api/docgia", docgiaRouter);
app.use("/api/sach", sachRouter);
app.use("/api/theodoimuonsach", theodoimuonsachRouter);
app.use("/api/carts", cartsRouter)
app.use("/api/nhaxuatban", nhaxuatbanRouter)
app.use("/api/nhanvien", nhanvienRouter)




// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});


module.exports = app;
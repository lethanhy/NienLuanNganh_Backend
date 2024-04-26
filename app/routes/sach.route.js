const express = require("express");
const sach = require("../controllers/sach.controller");
const carts = require("../controllers/cart.controller");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// // Thiết lập nơi lưu trữ file upload
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Lưu trữ trong thư mục uploads/
//     },
//     filename: function (req, file, cb) {
//         // Tạo tên file mới bằng thời gian hiện tại và phần mở rộng của file
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//       }
// });

// // Khởi tạo middleware multer
// const upload = multer({ storage: storage });

router.route("/")
    .get(sach.findAll)
    // .post(sach.create)
    .delete(sach.deleteAll);
// router.route("/upload", upload.single('image')).post(products.create);

// router.route("/category/:id")
//     .get(products.findOneCategory);

// router.route("/category")
//     .get(products.findAllCategory)

router.route("/:id")
    .get(sach.findOne)
    .put(sach.update)
    .delete(sach.delete);

router.route("/Add")
    .post(sach.create);

router.route("/addcart")
    .post(sach.addCart);

module.exports = router;
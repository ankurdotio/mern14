const express = require('express');
const productController = require("../controllers/product.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")


const upload = multer({
    storage: multer.memoryStorage()
})
const router = express.Router();

/* POST /api/products/ */
router.post("/",
    authMiddleware.authSeller,
    upload.array("images", 5),
    productController.createProduct
)

/* GET /seller */

router.get("/seller",
    authMiddleware.authSeller,
    productController.getSellerProducts
)

router.get("/", productController.getAllProducts)

router.get("/product-details/:id", productController.getProductDetails)


module.exports = router;
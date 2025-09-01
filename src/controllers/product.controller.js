const productModel = require("../models/product.model")

async function createProduct(req, res) {

    const files = req.files

    console.log(files)

}



module.exports = {
    createProduct
}
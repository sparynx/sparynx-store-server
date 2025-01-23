const express = require('express');

const {
    postAProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    searchProduct
} = require("./product.controller");
const verifyAdminToken = require('../middleware/VerifyAdminToken');

const router = express.Router();


//post a product
router.post("/create-product", verifyAdminToken, postAProduct)

//get all products
router.get("/", getAllProduct)

//get a single product
router.get("/:id", getSingleProduct)

//edit a single product
router.put("/edit/:id", verifyAdminToken, updateProduct)

//delete a single product
router.delete("/:id", verifyAdminToken, deleteProduct)

//search bar functionality
router.get("/search",searchProduct) 


module.exports = router
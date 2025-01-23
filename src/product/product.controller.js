const Product = require("./product.model")



const postAProduct = async (req, res) => {
    
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(200).send({message: "product saved successfully", data: newProduct});
    } catch (error) {
        console.error("error creating product", error)
        res.status(500).send({message: "Failed to create product"})
    }
}

const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find().sort({createdAt: -1})
        res.status(200).send(product)
    } catch (error) {
        console.error("error getting the product", error)
        res.status(500).send({message: "failed to get the product"})
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);

        if(!product) {
            res.status(404).send({message: "product not found"});
        }
        res.status(200).send(product);

    } catch (error) {
        console.log("error getting product", error);
        res.status(500).send({message: "failed to get product"});
    }
}


const updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const updateProduct = await Product.findByIdAndUpdate(id ,req.body , {new: true});

        if(!updateProduct) {
            res.status(404).send({message: "product not found"});

        }
        res.status(200).send({
            message: "product updated successfully",
            product: updateProduct
        })

    } catch (error) {
        console.log("error updating product", error);
        res.status(500).send({message: "failed to update product"});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct) {
            res.status(404).send({message: 'Product not found'});

        }
        res.status(200).send({
            mesage: "product deleted successfully",
            product: deletedProduct
        })

    } catch (error) {
        console.log("error deleting product", error);
        res.status(500).send({message: "failed to delete product"}); 
    }
}


const searchProduct = async (req, res) => {
    const {query} = req.query

    try {
        const results = await Product.find({
            $or: [
                {name: {$regex: query, $options: "i"}},
                {description: {$regex: query, $options: "i"}}
            ]
        });

        res.json(results)
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    postAProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    searchProduct
}
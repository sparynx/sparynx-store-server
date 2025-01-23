const express = require('express');
require('dotenv').config()


const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "https://thesparynxstore.vercel.app"],
    credentials: true
}));



//routes 
const productRoutes = require("../src/product/product.route")
const orderRoutes = require("../src/orders/order.route")
const userRoutes = require("../src/users/user.route")


app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);



async function main() {
    await mongoose.connect(process.env.DB_URI);

    app.use("/", (req, res) => {
        res.send('sparynx server is listening');
    })
}



main().then(() => console.log("mongodb connected succesfully")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});
const Order = require("./order.model")
const nodemailer = require('nodemailer');

const createOrder = async  (req, res) => {
    try {
        const newOrder = await Order(req.body)
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        console.log("Error creating order: ", error)
        res.status(500).json({message: "Error creating order"})
    }
}


const getOrderByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const orders = await Order.find({email}).sort({createdAt: -1})

        if(!orders) {
            res.status(404).json({message: "Error getting order"})

        }

        return res.status(200).json(orders)

    } catch (error) {
        console.error("Error getting order", error)
        res.status(500).json({message: "Error getting order", error})
    }
}


const sendOrderDetails = async (req, res) => {
    const {email, orderId} = req.body

    try {
        const order = await Order.findById(orderId);
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }

        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
              user: 'sparynxcyberneti@gmail.com', // Your email address
              pass: 'Adebisi123#', // Your email password
            },
          });

      // Set up email data
      let mailOptions = {
        from: '"Sparynx Store" <your-email@gmail.com>', // Sender address
        to: email, // List of receivers
        subject: 'Your Order Details', // Subject line
        text: `Order Details:\n\n${JSON.stringify(order, null, 2)}`, // Plain text body
        html: `<h1>Order Details</h1><pre>${JSON.stringify(order, null, 2)}</pre>`, // HTML body
      };


          // Send mail with defined transport object
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Order details sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
};



module.exports = {createOrder, getOrderByEmail, sendOrderDetails }
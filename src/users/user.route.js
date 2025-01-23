const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY

router.post("/admin", async (req, res) => {
    const {username, password} = req.body; 
    try {
        const admin = await User.findOne({username})
        if(!admin) {
            res.status(404).json({message: "admin not found"});
        }
        if(admin.password !== password) {
            res.status(404).json({message: "password mismatch"});
        }

        const token = jwt.sign({id: admin._id, username:admin.username, role:admin.role},
            JWT_SECRET,
            {expiresIn: "1h"}
        )

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        })

    } catch (error) {
        console.log("Failed to login as admin", error);
        res.status(404).json({message: "access denied"});
    }
})


module.exports = router;
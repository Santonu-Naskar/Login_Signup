const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const fetchuser=require("../middleware/fetchuser.js")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const jwt_secret =process.env.jwt_secrets;


//  Router1: Create User Post:/create
router.post('/create', [
    body('email', 'Enter a valid mail').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
    body('name', 'Enter a valid name').isLength({ min: 3 })
], async (req, res) => {
    // if there is an error in format of mail name and password andreturn them 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({sucess:false, errors: errors.array() });
    }

    // try and catch
    try {
        // check mail exist or not
        const femail = await User.findOne({ email: req.body.email });
        if (femail) {
            return res.status(400).json({ sucess:false, errors: "a user with this email already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // create and insert user
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        // or use this have same functionality_________________________________________
        // const user = await User(req.body);
        // user.save()

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_secret)
        // res.json(user)
        await res.json({sucess:true, authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})

//  Router2: login User Post:/login | LOGIN NOT REQUIRE
router.post('/login', [
    body('email', 'Enter a valid mail').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    // if there is an error in format of mail name and password andreturn them 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({sucess:false, errors: errors.array() });
    }
    const {email,password}=req.body;
    // try and catch
    try {
        // check mail exist or not
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({sucess:false, errors: "invalied information" })
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({ sucess:false,errors: "invalied information" })
        }
        
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_secret)
        // res.json(user)
        await res.json({sucess:true, authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})

//  Router2: get User details Post:/getuser | LOGIN REQUIRE
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})
module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require ('../middlewares/auth');

const secret = 'test';

require('../db/conn');
const Usermodel = require('../models/userModel');

//register route
router.post('/register', async (req, res) =>{
    
    const { fname, lname, email, password, cpassword} = req.body;
   
 try{
    if (!fname || !lname || !email || !password || !cpassword){
        return res.status(422).json({ error: "Plz filled the field properly" });
    }
 
    const userExist = await Usermodel.findOne({email:email});

    if (userExist){
        return res.status(422).json({ error: "Email already Exist" });
    } else if (password != cpassword) {
        return res.status(422).json({ error: "password are not matching" });
    }else{
    const user = new Usermodel({fname, lname, email, password, cpassword});

    await  user.save();

    res.status(201).json({ message: "User registered successfully"});
    }

 } catch (err){
    console.log(err);
 }

});

//login route

router.post('/login', async (req,res) =>{
    try{
        const {email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({error:"Plz filled the field properly"})
        }

        const userLogin = await Usermodel.findOne({email:email});

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if (!isMatch){
                res.status(400).json({ error: "User error" });
            } else{
                res.json({ message: "User Login Successfully" });
        }
        
        }else {
            res.status(400).json({ error: "User error" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/', (req,res) => {
    console.log('welcome');
    res.send('Welcome')
})
module.exports = router;

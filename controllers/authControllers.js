const userModel = require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken=require('../utils/generateToken')

module.exports.registerUser = async function(req, res){
    try {
        let { email, password, fullname } = req.body;

        let user=await userModel.findOne({ email:email})
        if(user){
        //  return res.status(401).send("You already have account.Please login first")
        req.flash('error',"You already have account.Please login first")
        return res.redirect('/')
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({ email, password: hash, fullname });
                    let token =generateToken(user);
                    res.cookie("token",token)
                    res.send("user created successfully")
                }
            });
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports.loginUser = async function(req, res){
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email})
        if(!user) {
            // return res.status(401).send("Invalid email or password");
            req.flash('error',"Invalid email or password")
            return res.redirect('/')   
        }

        bcrypt.compare(password, user.password, function(err, result) {
       if(result){
        let token = generateToken(user);
        res.cookie("token",token)
        res.redirect('/shop')
       }else{
        return res.status(401).send("Invalid email or password");
       }
    })   
    }catch (err){
        return res.status(500).send(err.message);
    }

}

module.exports.logout=(req, res, next)=>{
    console.log("Logout route hit");
    res.clearCookie('token');
    res.redirect('/');
}
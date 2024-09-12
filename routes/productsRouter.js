const express=require('express');
const upload = require('../config/multer.config');
const productModel = require('../models/product.model');
const router=express.Router();

router.post('/create', upload.single("image"), async function(req,res){
   let {name,price,discount,bgcolor,panelcolor,textcolor} = req.body;
   let product = await productModel.create({
    image:req.file.buffer,
    name,price,discount,bgcolor,panelcolor,textcolor,
   })

//    res.status(200).send(product);
req.flash("success","Product create successfully")
res.redirect("/owners/admin")
} )
module.exports = router
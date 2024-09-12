const express=require('express');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');
router.get('/', (req, res) => {
    let error = req.flash("error"); // or some error message if there's an error
    res.render('index', { error,loggedin:false}); // Pass error to the template
});

router.get('/shop',isLoggedIn, async function(req, res) {
    let products = await productModel.find()
    let success=req.flash("success")
    res.render('shop', { products,success })
});
router.get('/addtocart/:productid',isLoggedIn, async function(req, res){
    let user=await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid)
    await user.save()
    req.flash('success',"Added to cart")
    res.redirect('/shop');
})

router.get('/cart',isLoggedIn, async function(req, res){
    let user=await userModel.findOne({email:req.user.email}).populate("cart")
    const bill=Number(user.cart[0].price)+20-Number(user.cart[0].discount)
    res.render('cart', {user,bill});
    // console.log("user cart", user.cart);

})
    
router.get('/logout',isLoggedIn,  function(req, res) {
    // res.render('shop');
    res.clearCookie('token');
    res.redirect('/');
})

router.get('/admin', function(req, res) {
    res.render('admin');
})

router.get('/owner/login', function(req, res) {
    res.render('owner-login');
})


module.exports = router
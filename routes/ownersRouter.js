const express=require('express');
const router=express.Router();
const ownerModel=require('../models/owner.model');

router.get('/', function(req, res) {
    res.send('Hello from the homepage!');
})
console.log("process environment variables",process.env.NODE_ENV);
if(process.env.NODE_ENV === "development" ){
    router.post('/create', async function(req, res) {
        let owners=await ownerModel.find()
        if(owners.length>0){
            return res.status(503).send("You donot have permission to create");
        }
        let {fullname, email,password}=req.body;
        let createdOwner=await ownerModel.create({fullname, email, password})
        res.status(200).send(createdOwner);
    })
}

router.get('/admin',function(req,res) {
    let success=req.flash('success');
    res.render('createproducts',{success});
})

module.exports = router
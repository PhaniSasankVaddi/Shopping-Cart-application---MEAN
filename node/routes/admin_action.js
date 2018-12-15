var express = require('express');
var router = express.Router();
var adminModel = require('../models/admin_model');
var jwt = require('jsonwebtoken');


router.post('/signin', function(req,res,next){
    let promise = adminModel.findOne({email:req.body.email}).exec();
    
    promise.then(function(person){
        if(person){
            if(person.isValid(req.body.password)){
                let webToken = jwt.sign({email:person.email},'secretkey',{expiresIn : '1h'});
                return res.status(200).json(webToken);
            }
            else{
                return res.status(403).json({message:'Invalid Credentials'});
            }
        }
        else{
            return res.status(510).json({message:'Admin NotFound'});
        }
    });
    
    promise.catch(function (error){
        return res.status(510).json({message:'Error while fetching admin details'});
    });
    
});

router.post('/signup',function(req,res,next){
   adminModel.find({'email': req.body.email},(error,doc) =>{
       if(doc.length != 0){
           res.json({message:'Email id is already registered'});
       }else{
           var admin = new adminModel({
               email:req.body.email,
               username: req.body.username,
               password: adminModel.hashPassword(req.body.password),
               creation_dt: Date.now()
           });
           
           let promise = admin.save();
           
           promise.then(function(doc){
               return res.status(201).json({message:'Registration Successful'});
           })
           
           promise.catch(function(error){
               return res.status(501).json({message: 'Error while adding admin'});
           })
       }
   }) 
});

module.exports = router;
    

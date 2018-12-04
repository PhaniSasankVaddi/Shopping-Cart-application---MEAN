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

module.exports = router;
    

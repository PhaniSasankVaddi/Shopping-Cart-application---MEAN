var express = require('express');
var router = express.Router();
var userModel = require('../models/user_model');
var jwt = require('jsonwebtoken');


router.post('/signup',function(req,res,next){
  userModel.find({'email': req.body.email},(error,doc) =>{
    if(doc.length != 0){
      res.json({message:'Email id is already registered'});
    }else{
      var user = new userModel({
      email: req.body.email,
      username: req.body.username,
      password: userModel.hashPassword(req.body.password),
      active_ind: "Y",
      creation_dt: Date.now()
  });

  let promise = user.save();

  promise.then(function(doc){
    return res.status(201).json({message:'Registration Successful'});
  })

  promise.catch(function(error){
    return res.status(501).json({message: 'Error while registering user.'})
  })
    }
  })
    
});

router.post('/signin', function(req,res,next){
   let promise = userModel.findOne({email:req.body.email}).exec();
   
   promise.then(function(person){
     if(person){
        if(person.active_ind =="Y"){
            if(person.isValid(req.body.password)){
                let webToken = jwt.sign({email:person.email},'secretkey',{expiresIn : '1h'});
                return res.status(200).json(webToken);
            }else{
                return res.status(403).json({message:'Invalid Credentials'});
            }
        }else{
            return res.status(410).json({message:'User is not active. Please contact Store Manager'})
        }
    }
     else{
       return res.status(410).json({message:'User not found. Please Register'});
     }
   });
   
   promise.catch(function(error){
     return res.status(500).json({message:'Internal Server Error'});
   });
    
});




module.exports = router;
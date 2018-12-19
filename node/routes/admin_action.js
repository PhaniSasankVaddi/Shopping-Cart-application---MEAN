var express = require('express');
var router = express.Router();
var adminModel = require('../models/admin_model');
var fruitModel = require('../models/fruits_model');
var userModel = require('../models/user_model');
var commentModel = require('../models/comment_model');
var jwt = require('jsonwebtoken');


router.post('/signin', function(req,res,next){
    
    adminModel.findOne({'email':req.body.email},(error,doc) =>{
        if(doc){
            if(doc.isValid(req.body.password)){
                let webToken = jwt.sign({email:doc.email},'secretkey',{expiresIn : '1h'});
                return res.status(200).json(webToken);
            }else{
                return res.status(403).json({message:'Invalid Credentials'});
            }
        }
        else{
            return res.status(510).json({message:'Admin NotFound'});
        }
    })
    
});

router.post('/signup',function(req,res,next){
   adminModel.findOne({'email': req.body.email},(error,doc) =>{
       if(doc){
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

router.post('/addItem', tokenVerification, function(req, res, next) {
    fruitModel.findOne({'fruitName': req.body.fruitName},(error,doc) =>{
        if(doc){
           return res.json({message:'Fruit already exists'});
        }else{
            var fruit = new fruitModel({
                fruitName: req.body.fruitName,
                alt_name: req.body.alt_name,
                price: req.body.price,
                availability: req.body.availability,
                tax: req.body.tax,
                about: req.body.about
            });
            
            let promise = fruit.save();
            
            promise.then(function(doc){
                return res.status(201).json({message:'Product added successfully'});
            });
            
            promise.catch(function(error){
                return res.status(501).json({message: 'Error while adding item'});
            })
        }
    })
});

router.put('/updateItem', tokenVerification, function(req,res,next){
    fruitModel.findOne({'fruitName': req.body.fruitName},(error,doc) =>{
        if(!doc){
            return res.json({message: 'No Product found'});
        }else{
            fruitModel.updateOne({'fruitName':req.body.fruitName},
            {$set:{'price':req.body.price, 'availability':req.body.availability,'tax':req.body.tax,'about':req.body.about}},
            {upsert:true},(error1) =>{
                if(error1){
                  return res.json({message:'Error occured while updating in db'});
                }else{
                  return res.json(({message:'Product Updated Successfully'}));
                }
            }
            )
        }
    })
});

router.post('/deleteItem',tokenVerification, function(req,res,next){
    fruitModel.findOne({'fruitName': req.body.fruitName},(error,doc) =>{
        if(!doc){
            res.json({message:'No Item Found'});
        }else{
            fruitModel.deleteOne({'fruitName': req.body.fruitName},(error) =>{
                if(!error){
                    return res.json({message:'Product deleted successfully'});
                }else{
                    return res.json({message:'Error while deleting the product'});
                }    
            })
        }
    })
});

router.put('/userStatus', tokenVerification, function(req,res,next){
    userModel.findOne({'email': req.body.email},(error,doc) =>{
        if(!doc){
            return res.json({message:"No user exists"});
        }else{
            if(doc.active_ind=="Y"){
                userModel.updateOne({'email':req.body.email},
                {$set:{'active_ind':"N"}},
                {upsert:true},(error1) =>{
                if(error1){
                    return res.json({message: 'Error occured while updating in db'});
                }else{
                    return res.json({message:'User-'+doc.username+' Deactivated'});
                }
            })
            }else{
                userModel.updateOne({'email':req.body.email},
                {$set:{'active_ind':"Y"}},
                {upsert:true},(error1) =>{
                if(error1){
                    return res.json({message: 'Error occured while updating in db'});
                }else{
                    return res.json(({message:'User-'+doc.username+' Activated'}));
                }
            })
            }
            
        }
    })
})

router.put('/hideComment', function(req,res,next){
    commentModel.findOne({'email':req.body.email,'fruitName':req.body.fruitName},(error,doc) =>{
        if(!doc){
            return res.json({message:'No comments exists for this user'});
        }else{
            if(doc.active_ind=="Y"){
                commentModel.updateOne({'email':req.body.email,'fruitName':req.body.fruitName},
                {$set:{'active_ind':"N"}},
                {upsert:true},(error1) =>{
                    if(error1){
                        return res.json({message:'Error occured while updating'});
                    }else{
                        return res.json({message:'Users comment hidden'})
                    }
                })
            }else{
                commentModel.updateOne({'email':req.body.email,'fruitName':req.body.Fruit},
                {$set:{'active_ind':"Y"}},
                {upsert:true},(error1) =>{
                    if(error1){
                        return res.json({message:'Error occured while updating'});
                    }else{
                        return res.json({message:'Users comment hidden'})
                    }
                })
            }
        }
    })
    
});

router.post('/makeAdmin', tokenVerification, function(req,res,next){
    userModel.findOne({'email':req.body.email},(error,doc) =>{
        if(!doc){
            return res.status(400).json({message:'No user found'});
        }else{
            var admin = new adminModel({
                email:doc.email,
                username: doc.username,
                password:doc.password,
                creation_dt: Date.now()
            });
            
            let promise = admin.save();
            
            promise.then(function(doc){
                return res.status(201).json({message:'Admin added Successfully'});
            });
            
            promise.catch(function(error){
                return res.status(410).json({message:'Error while adding admin'});
            })
            
        }
    })
    
});

var token_decoded = '';
function tokenVerification(req,res,next){
    let token = req.headers.authorization;
    console.log(token);
    jwt.verify(token,'secretkey',function(error,tokenData){
        if(error){
            return res.status(400).json({message:'Request Unauthorizied'});
        }
        if(tokenData){
            console.log(tokenData);
            token_decoded = tokenData;
            next();
        }
    })
}

module.exports = router;
    

var express = require('express');
var router = express.Router();
var userModel = require('../models/user_model');
var cartModel = require('../models/cart_model');
var fruitModel = require('../models/fruits_model');
var jwt = require('jsonwebtoken');


router.post('/signup',function(req,res,next){
  userModel.findOne({'email': req.body.email},(error,doc) =>{
    if(doc){
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
   
   userModel.findOne({'email':req.body.email},(error,doc) =>{
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

router.post('/addtoCart', tokenVerification, function(req, res, next) {
    cartModel.findOne({'fruitName': req.body.fruitName},(error,item) =>{
      if(item){
        cartModel.updateOne({'fruitName':req.body.fruitName},
        {$set:{'quantity': item.quantity+1, 'total': (item.quantity+1)*(item.price+(item.price*item.tax)/100)}},
        {upsert:true},(error1) =>{
          if(error1){
            return res.json({message:'Error while adding items to the cart'})
          }else{
            return res.json({message:'Items updated successfully'})
          }
        })
      }else{
        fruitModel.findOne({'fruitName': req.body.fruitName},(error,fruit) =>{
          if(fruit !=null && fruit.length != 0){
            var cartItem = new cartModel({
              'userId':token_decoded.email,
              'fruitName': req.body.fruitName,
              'availability': fruit.availability,
              'tax': fruit.tax,
              'price': fruit.price,
              'quantity': 1,
              'total': (fruit.price+(fruit.price*fruit.tax)/100)
            });
            
            let promise = cartItem.save();
            
            promise.then(function(doc){
                return res.status(201).json({message:'Item added to cart successfully'});
            });
            
            promise.catch(function(error){
                return res.status(501).json({message: 'Error while adding item'});
            })
            
          }else{
            return res.json({message:'No fruit found to add into the cart'});
          }
        })
      }
    })
})

router.get('/fetchCart', tokenVerification, function(req,res,next) {
  cartModel.find({'userId': token_decoded.email},(error,items) =>{
    if(items){
      res.send(items);
    }else{
      res.status(400).json({message:'No items in the cart'});
    }
    if(error){
      res.status(500).json({message:'Error while fetching items in cart'});
    }
  })
  
});

var token_decoded = '';
function tokenVerification(req,res,next){
    let token = req.headers.authorization;
    jwt.verify(token,'secretkey',function(error,tokenData){
        if(error){
            return res.json(400).json({message:'Request Unauthorizied'});
        }
        if(tokenData){
            token_decoded = tokenData;
            next();
        }
    })
}


module.exports = router;
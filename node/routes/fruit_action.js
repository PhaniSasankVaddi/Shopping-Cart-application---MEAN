var express = require('express');
var router = express.Router();
var fruitModel = require('../models/fruits_model');

router.get('/load', function(req,res,next){
    fruitModel.find({'availability':{$gt: 0}},(error,items) =>{
        if(error){
            return res.json({message:'Error occured while fetching fruits'});
        }else if(items.length ==0){
            return res.json({message:'No items in the shelf'});
        }else{
            return res.send(items);
        }
    });
});

module.exports = router;
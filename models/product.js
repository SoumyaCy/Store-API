const mongoose=require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter a valid name']
    },
    price:{
        type:Number,
        required:[true,'price of product must be provided']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:2.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','marcos','liddy','caressa'],
            message:'{VALUE} is not part of affiliated companies'
        }
    }
});

module.exports= mongoose.model('productSchema',productSchema);
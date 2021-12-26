const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const couponSchema = new Schema({
    couponCode : {
        type:String,
    },
    amount : {
        type:Number,
    },
    startDate:{
        type: Date,
    },
    endDate:{
        type: Date,
    },
    minimumPurchaseAmount:{
        type: Number,
    },
    maximumDiscountAmount:{
        type: Number,
    },
    type:{
        type: String,
        enum: ['Flat','Percentage'],
    },
});

const Coupon = mongoose.model('coupons',couponSchema);

module.exports = Coupon;
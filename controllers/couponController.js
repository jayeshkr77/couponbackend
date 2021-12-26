const mongoose = require('mongoose');
const Coupon = require('../modals/coupon');

// Coupon schema
function CouponData(data) {
    this.couponCode = data.couponCode
    this.amount = data.amount
    this.startDate = data.startDate
    this.endDate = data.endDate
    this.minimumPurchaseAmount = data.minimumPurchaseAmount
    this.maximumDiscountAmount = data.maximumDiscountAmount
    this.type = data.type;
}

/**
 * Coupon List.
 * 
 * @returns {Object}
 */
exports.couponList = (req, res) => {
    try {
        Coupon.find({}, "-_id couponCode amount startDate endDate minimumPurchaseAmount maximumDiscountAmount type Flat").then((coupons) => {
            if(coupons.length){
                return res.status(200).json({ message: "Success: Retrieved all coupon", data: coupons });
            }else{
                return res.status(404).json({ message: "Failure: No coupon's found", data: coupons });
            }
        });
    } catch (err) {
        return res.status(500).json({ message: "Failure: Server error occured", error: err });
    }
}

/**
 * Creates a new coupon.
 * 
 * @returns {Object}
 */
exports.couponCreate = (req, res) => {
    try {
        console.log(req.body)
        Coupon.find({ couponCode: req.body.couponCode }, "couponCode startDate endDate").then((coupon) => {
            console.log(coupon);
            if (coupon.length) {
                if (new Date(coupon[0].endDate) < new Date()) {
                    //could have done this in previous query.
                    
                    Coupon.findOneAndUpdate({ couponCode: req.body.couponCode }, req.body, { couponCode: 'RNCH-500' }).then(coupon => {
                        res.status(200).json({ message: "Success: updated the previous expired coupon", data: coupon });
                    })
                } else {
                    return res.status(400).json({ message: "Failure: Coupon code already present", data: coupon });
                }
            } else {
                const newCoupon = new Coupon(req.body);
                newCoupon.save().then(coupon => res.json({message: "Success: Coupon code successfully created"})).catch(err => res.json(err))
            }
        });
    } catch (err) {
        return res.status(500).json({ message: "Failure: Server error occured", error: err });
    }
}

exports.couponApply = (req, res) => {
    try {     
        Coupon.find({couponCode:req.body.couponCode}).then((coupons)=>{
            if(!coupons.length){
                return res.status(404).json({ message: "Failure: No coupon's found", data: {coupon:coupons[0], payableAmount: req.body.cart, discount:0} });
            }else{
                if(new Date(coupons[0].endDate) < new Date() || new Date(coupons[0].startDate) > new Date()){
                    return res.status(400).json({ message: "Failure: Coupon's expired", data: {coupon:coupons[0], payableAmount: req.body.cart, discount:0} });
                }else{
                    //Aply the coupon code
                    let discount = 0;
                    if(coupons[0].minimumPurchaseAmount > req.body.cart){
                        return res.status(200).json({ message: `Failure: Coupon can be applied on minimum order of ${coupons[0].minimumPurchaseAmount}`, data: {coupon:coupons[0], payableAmount: req.body.cart, discount:0} });
                    }else if(coupons[0].type === 'Percentage'){
                        discount = req.body.cart * (coupons[0].amount / 100)
                        if(coupons[0].maximumDiscountAmount){
                            discount = (Math.min(discount,coupons[0].maximumDiscountAmount));
                        }
                    }else if(coupons[0].type === 'Flat'){
                        discount = Math.min(coupons[0].amount,req.body.cart);

                    }else{
                        return res.status(400).json({ message: "Failure: Invalid coupon code type", data: {coupon:coupons[0], payableAmount: req.body.cart, discount:0} });
                    }
                    let payableAmount = (req.body.cart - discount) < 0 ? 0 : req.body.cart - discount;
                    res.status(200).json({ message: "Success: Coupon code applied", data: {coupon:coupons[0], payableAmount: payableAmount, discount:discount}});
                }
            }
        })
    } catch (err) {

    }
}
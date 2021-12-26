exports.validCoupon = (coupon) => {
    if(coupon.couponCode.length < 3 && coupon.couponCode.length > 10){
        throw new Error('Coupon length should be between 3 to 10 characters');
    }
    if(coupon.type !== 'Flat' || coupon.type !== 'Percentage'){
        throw new Error('Invalid coupon type. Coupon type should be either "Flat" or "Percentage" ')
    }
    console.log(coupon.endDate)
    if(coupon.endDate > (new Date()).getDate()){
        //throw new Error('Coupon has expired');
    }
    return true;
}
const express = require('express');
const router = express.Router();

const Coupon = require('../modals/coupon');
const couponController = require('../controllers/couponController')

// /api/coupon
router.get('/',couponController.couponList);
router.post('/',couponController.couponCreate);
// router.get('/:couponCode',couponController.couponValidate);
router.post('/Apply', couponController.couponApply);

module.exports = router;
import express from 'express'
import {showBuyNowPage, handleBuyNowSubmit ,OrderPage} from '../controller/Order_controller.js';
import {checkLogin} from '../Authenticate/check_login.js'
const router = express.Router()
router.get('/order',OrderPage)

router.get('/:productId',checkLogin, showBuyNowPage);
router.post('/:productId', checkLogin,handleBuyNowSubmit);


 export default router

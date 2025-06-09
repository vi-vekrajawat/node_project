import express from 'express'
import { indexPage,aboutPage,homePage,loginPage,signUpPage,contactPage } from '../controller/index_controller.js';
import { singUp } from '../controller/singnUp_controller.js';
import { BuyNow } from '../controller/buynow_controller.js';
import { signIn , logOut} from '../controller/signIn_controller.js';
// import { emailAuth } from '../controller/user_controller.js';
const router = express.Router();

router.get('/',indexPage)
router.get('/about',aboutPage)
router.get('/home',homePage)
router.get('/contact',contactPage)

router.get('/login',loginPage)
router.get('/signup',signUpPage)
router.post('/signup',singUp)
// router.post('/login',loginPage)
router.post('/login',signIn)
router.get('/logout',logOut)
router.get('/buyNow/:productId',BuyNow)
router.post('/buyNow',BuyNow)
// router.get('/chkemail/:emailId',emailAuth)
// router.post('/b-now',BuyNow)

export default router

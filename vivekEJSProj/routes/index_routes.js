import express from 'express'
import { indexPage,aboutPage,homePage,loginPage,signUpPage,contactPage, searchProduct} from '../controller/index_controller.js';
import { singUp } from '../controller/singnUp_controller.js';
import { BuyNow } from '../controller/buynow_controller.js';
import { signIn , logOut} from '../controller/signIn_controller.js';
import { checkLogin } from '../Authenticate/check_login.js';
import multer from "multer";
import { profilePage,uploadProfile } from '../controller/user_controller.js';
const upload = multer({dest:"public/user_profile"});

const router = express.Router();

router.get('/',indexPage)
router.get('/about',aboutPage)
router.get('/home', checkLogin,homePage)
router.get('/contact',contactPage)

router.get('/login',loginPage)
router.get('/signup',signUpPage)
router.post('/signup',singUp)
router.post('/login',signIn)
router.get('/logout',logOut)
router.get('/buyNow/:productId',checkLogin,BuyNow)
router.post('/buyNow',checkLogin,BuyNow)
router.get('/search', searchProduct)

router.get("/profile",checkLogin,profilePage);
router.post("/user/profile",checkLogin,upload.single("profile"),uploadProfile);
 

export default router

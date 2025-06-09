import express from 'express';
import router from './routes/index_routes.js';
import bodyParse from 'body-parser';
import prodcutRouter from './routes/Product_Router.js';
import  BuyNow  from './routes/order_routes.js';
import session from 'express-session'
// import UserRouter from './routes/user_route.js'
const app = express()

app.set("view engine","ejs")
// app.set('views', path.join(__dirname, 'views'));

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))
app.use(session({
    secret : 'dfdfdffdf',
    resave  : false,
    saveUninitialized:false
}))
app.use('/',router)
app.use('/product',prodcutRouter)
app.use('/buyNow',BuyNow)
// app.use("/user",UserRouter);
app.listen(3000,()=>{
    console.log("--------server--- -------started-----")
})
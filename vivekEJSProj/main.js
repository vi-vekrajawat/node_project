import express from 'express';
import router from './routes/index_routes.js';
import bodyParse from 'body-parser';
import prodcutRouter from './routes/Product_Router.js';
import BuyNow from './routes/order_routes.js';
import session from 'express-session';

const app = express();

app.set("view engine", "ejs");


// Middleware
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'dfdfdffdf',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,       
        maxAge: 1000 * 60 * 60 
    }
}));
app.use(express.static("./public"));


// 🔥 Cache disable middleware (must be after session)
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

// Routes
    app.use('/', router);
app.use('/product', prodcutRouter);
app.use('/buyNow', BuyNow);

app.listen(3000, () => {
    console.log("--------server--- -------started-----");
});

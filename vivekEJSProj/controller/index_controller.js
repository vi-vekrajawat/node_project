import express from "express";
import Product from "../model/product_model.js";
import pool from "../db/indexConfig.js";

export const indexPage =  (req,res,next)=>{
     
            return res.render("index",{currentUser: req.session.currentUser,isLoggedIn: req.session.isLoggedIn}); 


 }
export const aboutPage = (req,res,next)=>{
            return res.render("about",{currentUser: req.session.currentUser,isLoggedIn: req.session.isLoggedIn});

}

export const homePage = async (req,res,next)=>{
      let productList = await Product.findAll();
        return res.render("home",{products: productList,currentUser: req.session.currentUser,isLoggedIn: req.session.isLoggedIn}); 

 }
 export const contactPage = (req,res,next)=>{
     res.render('Contact.ejs')

 }
export const loginPage = (req,res,next)=>{
    res.render('login.ejs')
}
export const signUpPage = (req,res,next)=>{
    res.render('signup.ejs')
}

export const searchProduct = (req, res, next) => {
    const query = req.query.q;
    if (!query) return res.json({ products: [] });

    const sql = 'SELECT * FROM product WHERE name LIKE ?';
    const values = [`%${query}%`];

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ products: [] });
        }
        res.json({ products: results });
    });
};
import express from "express";
import Product from "../model/product_model.js";

export const indexPage =  (req,res,next)=>{
     
            return res.render("index",{/*products: productList,*/currentUser: req.session.currentUser,isLoggedIn: req.session.isLoggedIn}); 


 }
export const aboutPage = (req,res,next)=>{
            return res.redirect("about",{currentUser: req.session.currentUser,isLoggedIn: req.session.isLoggedIn});

}

export const homePage = async (req,res,next)=>{
      let productList = await Product.findAll();
    // return response.render("home.ejs",{products: productList}); 
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

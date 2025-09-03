import Product from "../model/product_model.js";
export const BuyNow = (request,response,next)=>{
   Product.findById(request.params.productId)
   .then(result=>{
     console.log(result[0]);
     return response.render("buyNow.ejs",{product:result[0]});
   }).catch(err=>{
    console.log(err);
   }); 
}

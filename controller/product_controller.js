import Product from "../model/product_model.js"
export const buyNowPage = async(request,response,next)=>{
   try{ 
    let result = await Product.findById(request.params.productId);
    let product = result[0];
    console.log(product);
    return response.render("buyNow.ejs",{isLoggedIn: request.session.isLoggedIn,currentUser: request.session.currentUser});
   }
   catch(err){
    console.log(err);
    // you can render error.ejs page here.
   }
}

export const saveInBulk = async (request,response,next)=>{
   try{ 
    let productList = request.body;
    console.log(productList)
    for(let product of productList){
        await Product.create(product);
    }
    return response.status(201).json({message: "All product saved.."});
   }
   catch(err){
    console.log(err);
   } 
}
export const getProductById = (request,response,next)=>{
   Product.findById(request.params.productId)
   .then(result=>{
     console.log(result[0]);
     return response.render("viewMore.ejs",{product:result[0]});
   }).catch(err=>{
    console.log(err);
   }); 
}

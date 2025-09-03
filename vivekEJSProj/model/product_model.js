import pool from "../db/indexConfig.js";

class Product{
    constructor(pId,name,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,reviewCount,rating,image,price){
        this.pId = pId;
        this.name = name;
        this.instructions = instructions;
        this.prepTimeMinutes = prepTimeMinutes;
        this.cookTimeMinutes = cookTimeMinutes;
        this.servings = servings;
        this.difficulty = difficulty;
        this.cuisine = cuisine;
        this.caloriesPerServing = caloriesPerServing;
        this.reviewCount = reviewCount;
        this.rating = rating;
        this.image = image;
        this.price=price
      
    }
   


   static create(product){
      return new Promise((resolve,reject)=>{
         pool.getConnection((err,con)=>{
            if(!err){
               let sql = "insert into product(pId,name,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,reviewCount,rating,image,price) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
               con.query(sql,[product.pId,product.name,product.instructions,product.prepTimeMinutes,product.cookTimeMinutes,product.servings,product.difficulty,product.cuisine,product.caloriesPerServing,product.reviewCount,product.rating,product.image,product.price],(err,result)=>{
                 con.release();
                 err ? reject(err) : resolve(result);
               });
            }
            else reject(err);
         })
      });       
    }

     static findAll(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
               let sql = "select * from product";
               con.query(sql,(err,result)=>{
                con.release();
                err ? reject(err) : resolve(result);
               })
            });
        });
    }

        static findById(productId){
      return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
               let sql = "select * from product where id = ?";
               con.query(sql,[productId*1],(err,result)=>{
                con.release();
                err ? reject(err) : resolve(result);
               })
            });
        });
    }


}

export default Product;
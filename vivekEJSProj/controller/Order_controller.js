import pool from "../db/indexConfig.js";
import Product from "../model/product_model.js";


export const showBuyNowPage = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const result = await Product.findById(productId); 

    if (!result || result.length === 0) {
      return res.status(404).send("Product not found");
    }

    const product = result[0]; 

    res.render('/buyNow', { product }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



export const handleBuyNowSubmit = (req, res, next) => {
  const productId = parseInt(req.params.productId); 
  console.log("producy  id ",productId)
  const { receiverName, contact, address } = req.body;

  if (isNaN(productId)) {
    return res.status(400).send("Invalid product ID");
  }

  pool.getConnection((err, con) => {
    if (!err) {
      const sql = "INSERT INTO orders ( receiverName, contact, address) VALUES (?, ?, ? )";
      con.query(sql, [receiverName, contact, address], (err, result) => {
        con.release();

        if (err) {
          console.log(err);
          return res.status(500).send("Database error");
        }

        console.log(result);
        res.render("order_placed.ejs")
      });
    } else {
      console.log(err);
      res.status(500).send("Connection error");
    }
  });
};

export const OrderPage = async(req, res, next) => {
    return res.render('order_placed.ejs');
  
}

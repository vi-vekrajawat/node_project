import pool from "../db/indexConfig.js";
import Product from "../model/product_model.js";
// import Order from "../model/order_details.js"


export const showBuyNowPage = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const result = await Product.findById(productId); // Adjust according to your DB logic

    if (!result || result.length === 0) {
      return res.status(404).send("Product not found");
    }

    const product = result[0]; // Or just `result` if not array

    res.redirect('/buyNow', { product }); // ✅ this sends the product to your EJS file
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



export const handleBuyNowSubmit = (req, res, next) => {
  const productId = parseInt(req.params.productId); // ✅ capture productId
  const { receiverName, contact, address } = req.body;

  if (isNaN(productId)) {
    return res.status(400).send("Invalid product ID");
  }

  pool.getConnection((err, con) => {
    if (!err) {
      const sql = "INSERT INTO orders ( receiverName, contact, address) VALUES (?, ?, ?)";
      con.query(sql, [receiverName, contact, address], (err, result) => {
        con.release();

        if (err) {
          console.log(err);
          return res.status(500).send("Database error");
        }

        console.log(result);
        // res.send("Order placed successfully!");
        res.render("order_placed.ejs")
      });
    } else {
      console.log(err);
      res.status(500).send("Connection error");
    }
  });
};

export const OrderPage = async(req, res, next) => {
    return res.redirect('/order');
  
}

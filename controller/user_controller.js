// import pool from "../db/indexConfig.js";
import Product from "../model/product_model.js";
import User from "../model/user_model.js";

export const signIn = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const result = await User.find(email, password);

    if (result.length) {
      request.session.isLoggedIn = true;
      request.session.currentUser = result[0];

      // ✅ Fetch products and render home page after successful login
      const productList = await Product.findAll();
      return response.render("home.ejs", { products: productList });
    } else {
      // ❌ Invalid credentials
      return response.redirect("/signin");
    }
  } catch (err) {
    console.error(err);
    return response.end("Something went wrong....");
  }
};

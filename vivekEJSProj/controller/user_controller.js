import Product from "../model/product_model.js";
import User from "../model/user_model.js";

export const uploadProfile = (req, res, next) => {
  if (req.file) {
    let fileName = req.file.filename;
    let currentUser = req.session.currentUser;
    let userId = currentUser.id;

    User.updateOne(fileName, userId)
      .then(result => {
        // Update session object
        req.session.currentUser.profile = fileName;
        return res.redirect("/profile"); // redirect to profile page
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Server error");
      });
  } else {
    res.redirect("/profile");
  }
}

export const profilePage = (request,response,next)=>{
  return response.render("profile.ejs",{currentUser: request.session.currentUser,isLoggedIn: request.session.isLoggedIn});
}

export const signIn = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const result = await User.find(email, password);

    if (result.length) {
      request.session.isLoggedIn = true;
      request.session.currentUser = result[0];

      const productList = await Product.findAll();
      return response.render("home.ejs", { products: productList });
    } else {
      return response.redirect("/signin");
    }
  } catch (err) {
    console.error(err);
    return response.end("Something went wrong....");
  }
};

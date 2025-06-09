export const checkLogin = (request,response,next)=>{
   if(request.session.isLoggedIn)
    next();
   else
     return response.redirect("/login");
}
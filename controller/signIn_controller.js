import express from 'express'
import pool from '../db/indexConfig.js'
// import pool from '../db/indexConfig.js';

export const signIn = (req, res, next) => {
  let { email, password } = req.body;

  pool.getConnection((err, con) => {
    if (err) {
      console.error('Database connection error:', err);
      return res.end("DB Connection Error");
    }

    const sql = 'SELECT * FROM signUpPageTable WHERE email = ? AND password = ?';

    con.query(sql, [email, password], (err, result) => {
      con.release();

      if (err) {
        console.error('Query error:', err);
        return res.end("Something went wrong with query...");
      }

      if (result.length) {
        // Set session
        req.session.isLoggedIn = true;
        req.session.currentUser = result[0];

        return res.redirect('/home');
      } else {
        
        return res.redirect('/login'); // Or show login error
      }
    });
  });
};

export const logOut = (req,res,next)=>{
  req.session.isLoggedIn=false;
  req.session.currentUser=null;
  req.session.destroy();
  return res.redirect('/')
}


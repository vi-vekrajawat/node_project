

import express from "express";
import pool from "../db/indexConfig.js";

export const singUp = (req, res, next) => {
  let { firstName, lastName, email, password, contact } = req.body;

  pool.getConnection((err, con) => {
    if (err) {
      console.error("CONNECTION ERROR:", err);
      return res.status(500).send("Connection error");
    }

let sql = 'INSERT INTO signUpPageTable(firstName, lastName, email, password, contact) VALUES (?, ?, ?, ?, ?)';
    con.query(sql, [firstName, lastName, email, password, contact], (err, result) => {
      con.release();

      if (err) {
        console.error("QUERY ERROR:", err); // Full error
        return res.status(500).send("Database error");
      }

      console.log("Insert successful:", result);
      res.render('login')
    //   res.status(200).send("User registered successfully");
    });
  });
};

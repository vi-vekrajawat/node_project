import mysql2 from 'mysql2'

const pool = mysql2.createPool({
    user:'root',
    password:'root',
    database:'expressapp',
    host:'localhost',
})

export default pool 
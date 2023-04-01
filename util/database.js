const mysql=require('mysql2');

const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node',
    password: 'Createpwd@123'
});

module.exports=pool;
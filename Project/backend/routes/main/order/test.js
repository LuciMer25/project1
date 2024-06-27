const mysql = require("mysql2");
const sql = require('../../../mysql/sql.js');
require('dotenv').config({path:'mysql/.env'});

const conn = { // mysql 접속 설정
    connectionLimit : process.env.MYSQL_LIMIT,
    host:process.env.MYSQL_HOST,
    port:process.env.MYSQL_PORT,
    user:process.env.MYSQL_USERNAME,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
};
const pool = mysql.createPool(conn);

function query2(sql, values) {
    console.log('SQL query:', sql);
    return new Promise((resolve, reject) => {
        pool.query(sql, values, function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function query3(sql, [values]) {
    console.log('SQL query:', sql);
    return new Promise((resolve, reject) => {
        pool.query(sql, [values], function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports= {query2,query3};
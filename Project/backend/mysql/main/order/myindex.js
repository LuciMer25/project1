const mysql = require("mysql2");
const sql = require('../../sql.js');
require('dotenv').config({path:'mysql/.env'});

const conn = { // mysql 접속 설정
    connectionLimit : process.env.MYSQL_LIMIT,
    host:process.env.MYSQL_HOST,
    port:process.env.MYSQL_PORT,
    user:process.env.MYSQL_USERNAME,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
    multipleStatements: true // 이 부분 추가
};
const pool = mysql.createPool(conn);

function query(alias, values) {
    console.log('SQL alias:', alias)
    console.log('SQL query:', sql[alias])
    console.log('Values:', values); // 추가된 로그
    return new Promise( (resolve, reject) => pool.query(sql[alias],values, function(err, result) {
        if(err) {
            console.log(err)
            reject(err)  
        } 
        else{
            resolve(result)
        } 
    }))
}


function multiquery(alias, values) {
  console.log('SQL alias:', alias);
  console.log('SQL query:', sql[alias]);
  console.log('Values:', values); // 추가된 로그
  return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
          if (err) {
              reject(err);
          } else {
              // 배열의 요소를 각각 쿼리의 인자로 전달
              const sqlQuery = sql[alias].replace('(?)', `(${values.map(() => '?').join(', ')})`);
              conn.query(sqlQuery, values, (err, result) => {
                  conn.release();
                  if (err) {
                      console.error("Error executing multiquery:", err);
                      reject(err);
                  } else {
                      resolve(result);
                  }
              });
          }
      });
  });
}


function cartQuery(queryString) {
    return new Promise((resolve, reject) => pool.query(queryString, function (err, result) {
      if (err) {
        console.log(err)
        reject(err)
      }
      else {
        resolve(result)
      }
    }))
}

module.exports = {query,multiquery,cartQuery};

var express = require('express');
var router = express.Router();
const mysql = require('../mysql/index');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



router.get("/",  async (req,res)=>{
  
  let testList = await mysql.query("testList")
  .then(result=>result);
  console.log(testList);
  res.render(testList);
  // res.send(boardList);
});
module.exports = router;
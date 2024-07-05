const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');
const multer = require('multer');
const { subCategory } = require('../../mysql/sql.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/project1/project/backend/upload/products');
  },
  filename: function (req, file, cb) {
    const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, Date.now() + '-' + originalname);
  }
});
const upload = multer({ storage: storage });

router.get("/prodList", async (req, res) => {
  let list = await query("prodList");
  res.send({ list });
});

router.post("/prodInsert", upload.fields([
  { name: 'prodImg' },
  { name: 'contentImg' }
]), async (req, res) => {
  let data = { ...req.body };
  if (req.files) {
    if (req.files.prodImg) {
      data.prodImg = req.files.prodImg[0].filename;
    }
    if (req.files.contentImg) {
      data.contentImg = req.files.contentImg[0].filename;
    }
  }
  const { prod_name, price, ctgr_no, prodImg, contentImg } = data;
  let result = await query("prodInsert", [prod_name, price, ctgr_no, prodImg, contentImg]);
  res.send(result);

});

router.get("/prodInfo/:no", async (req, res) => {
  const no = req.params.no;
  let list = await query("prodInfo", [no]);
  res.send({ list });
});

router.get("/categoryList", async (req, res) => {
  let list = await query("categoryList");
  const topCategories = list.filter(category => !category.top_ctgr_no);
  const categories = list.filter(category => category.top_ctgr_no);
  res.send({ topCategories, categories });
});

router.get("/subCategory/:no", async (req, res) => {
  const no = req.params.no;
  let list = await query("subCategory", [no]);
  res.send({ list });
});

router.put("/prodUpdate/:no", upload.fields([
  { name: 'prodImg' },
  { name: 'contentImg' }
]), async (req, res) => {
    const no = req.params.no;
    let data = { ...req.body };
    if (req.files) {
      if (req.files.prodImg) {
        data.prodImg = req.files.prodImg[0].filename;
      }
      if (req.files.contentImg) {
        data.contentImg = req.files.contentImg[0].filename;
      }
    }
    const { prod_name, price, ctgr_no, prodImg, contentImg } = data;
    let result = await query("prodUpdate", [prod_name, price, ctgr_no, prodImg, contentImg, no]);
    res.send(result);
});

router.delete("/prodDelete/:no", async (req, res) => {
  const no = req.params.no;
  let result = await query("prodDelete", [no]);
  res.send(result);
})

module.exports = router;
const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');

  router.get("/qnaList", async (req, res) => {
    let list = await query("qnaList");
    res.send({ list });
  });
  
  router.get("/inquiryList", async (req, res) => {
    let list = await query("inquiryList");
    res.send({ list });
  });

  router.get("/qnaAllList", async (req, res) => {
    let list = await query("qnaAllList");
    res.send({ list });
  });
  
  router.get("/inquiryAllList", async (req, res) => {
    let list = await query("inquiryAllList");
    res.send({ list });
  });

  router.get("/adminQnaInfo/:no", async (req, res) => {
    const no = req.params.no
    let list = await query("adminQnaInfo", [no]);
    res.send({ list });
  })

  router.post("/qnaReplyInsert", async (req, res) => {
    const { qnaNo, content} = req.body
    let result = await query("qnaReplyInsert", [content, qnaNo]);
    res.send(result);
  })

  router.put("/qnaStateUpdate", async (req, res) => {
    const { qnaNo } = req.body
    let result = await query("qnaStateUpdate", [qnaNo]);
    res.send(result)
  })

  // router.put("/qnaReplyUpdate", async (req, res) => {
  //   const { qnaNo, content } = req.body;
  //   let result = await query("qnaReplyUpdate", [content, qnaNo]);
  //   res.send(result);
  // });
  router.put("/qnaReplyUpdate", async (req, res) => {
    const { qnaNo, content } = req.body;
    try {
      console.log(`Updating QnA: qnaNo=${qnaNo}, content=${content}`); 
      let result = await query("qnaReplyUpdate", [content, qnaNo]);
      res.send(result);
    } catch (err) {
      console.error(err.message); 
      res.status(500).send({ error: err.message });
    }
  });

  router.get("/adminInquiryInfo/:no", async (req, res) => {
    const no = req.params.no
    let list = await query("adminInquiryInfo", [no]);
    res.send({ list });
  })

  router.post("/inquiryReplyInsert", async (req, res) => {
    const { inquiryNo, content} = req.body
    let result = await query("inquiryReplyInsert", [content, inquiryNo]);
    res.send(result);
  })

  router.put("/inquiryStateUpdate", async (req, res) => {
    const { inquiryNo } = req.body
    let result = await query("inquiryStateUpdate", [inquiryNo]);
    res.send(result)
  })

  router.put("/inquiryReplyUpdate", async (req, res) => {
    const { inquiryNo, content } = req.body;
    try { 
      let result = await query("inquiryReplyUpdate", [content, inquiryNo]);
      res.send(result);
    } catch (err) {
      console.error(err.message); 
      res.status(500).send({ error: err.message });
    }
  });

  router.get("/notifyList", async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);

    if(!page) {page = 1;}
    if(!pageUnit) {pageUnit = 10;}

    let offset = (page-1)*pageUnit;
    
    let list = await query("notifyList", [offset, pageUnit]);
    let count = await query("notifyCount");
    count = count[0].cnt;
    res.send({ list, count })
  })

  router.get("/notifyInfo/:no", async (req, res) => {
    const no = req.params.no
    let list = await query("notifyInfo", [no]);
    let img = await query("notifyImg", [no]);
    console.log(img)
    res.send({ list, img })

  })

module.exports = router;
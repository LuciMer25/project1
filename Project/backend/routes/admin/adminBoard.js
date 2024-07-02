const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/project1/project/backend/upload/notify');
  },
  filename: function (req, file, cb) {
    const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, Date.now() + '-' + originalname);
  }
});
const upload = multer({ storage: storage });

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
    const no = req.params.no;
    let list = await query("notifyInfo", [no]);
    let file = await query("notifyFile", [no]);
  
    let img = [];
    let files = [];
  
    file.forEach(ele => {
      if (ele.file_type === 'Image') {
        img.push(ele);
      } else {
        files.push(ele);
      }
    });
  
    res.send({ list, img, files });
  });

  router.post("/notifyInsert", async (req, res) => {
    const { title, content, category } = req.body;
    let result = await query("notifyInsert", [title, content, category])
    res.send(result);

  })

  router.post("/fileInsert/:noticeNo", upload.array('file'), async (req, res) => {
    const { noticeNo } = req.params;
    const files = req.files;
    const fileDetails = req.body;
  
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = fileDetails.fileType;
        const fileOrder = fileDetails.fileOrder;
  
        await query("fileInsert", [noticeNo, file.filename, fileOrder, fileType]);
      }
      res.send("등록성공");
    } catch (err) {
      console.log(err);
      res.status(500).send("파일 업로드 중 오류가 발생했습니다.");
    }
  });

  router.get("/notifyAdminInfo/:no", async (req, res) => {
    const no = req.params.no;
    let list = await query("notifyInfo", [no]);
    let files = await query("notifyFile", [no]);
  
    res.send({ list, files });
  });

  router.put("/notifyUpdate/:no" , async (req, res) => {
    const no = req.params.no;
    const { title, content, category } = req.body;
    let result = await query("notifyUpdate", [title, content, category, no]);
    res.send(result);
  });

  router.put("/fileUpdate/:no", async (req, res) => {
    const no = req.params.no; 
    const { name, fileType, sort } = req.body;
    let result = await query("fileUpdate", [name, fileType, sort, no]);
    res.send(result);
 
  });

  router.delete("/fileDelete/:no", async (req, res) => {
    const no = req.params.no; 
    let result = await query("fileDelete", [no]);
    res.send(result);
   
  });

  router.delete("/notifyDelete/:no", async (req, res) => {
    const no = req.params.no;
    let result = await query("notifyDelete", [no]);
    await query("fileDeleteAll", [no]);
    res.send(result);
  })
  router.post("/fileInsert1/:noticeNo", upload.array('files'), async (req, res) => {
    const { noticeNo } = req.params;
    const files = req.files;
    const fileDetails = req.body;
  
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = fileDetails[`fileType_${i}`];
        const fileOrder = fileDetails[`fileOrder_${i}`];
        
        await query("fileInsert", [noticeNo, file.filename, fileOrder, fileType]);
      }
      res.send("등록성공");
    } catch (err) {
      console.log(err);
      res.status(500).send("파일 업로드 중 오류가 발생했습니다.");
    }
  });

module.exports = router;
const express =	require("express");
const router =	express.Router();
const query =	require("../../mysql");

//목록
router.get("/maininquiryList",	async(req ,	res )	=> {
    let result = await query("maininquiryList").then(res=>res);
    res.send({result});
});

module.exports = router;
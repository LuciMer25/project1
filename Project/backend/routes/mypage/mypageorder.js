const express =	require("express");
const router =	express.Router();
const query =	require("../../mysql");

//목록
router.get("/",	async(req ,	res )	=> {
    let list = await query("mypageorder").then(res=>res);
    res.send({list});
});

module.exports = router;
const express =	require("express");
const router =	express.Router();
const query =	require("../../mysql");

router.get("/",	async(req ,	res )	=> {
    let result = await query("wishList").then(res=>res);
    res.send(result);
});

module.exports = router;
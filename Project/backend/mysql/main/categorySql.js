module.exports = {
    TopCategoryName:`SELECT ctgr_name, 
                            ctgr_no 
                     FROM category 
                     WHERE top_ctgr_no IS NULL`,
    BotCategoryName:`SELECT a_ctgr.ctgr_name, 
                            a_ctgr.top_ctgr_no 
                     FROM category AS a_ctgr 
                     INNER JOIN category AS b_ctgr 
                     ON a_ctgr.top_ctgr_no = b_ctgr.ctgr_no`,

}
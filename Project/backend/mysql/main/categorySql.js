module.exports = {
    TopCategoryName:'SELECT ctgr_name, ctgr_no FROM category WHERE top_ctgr_no IS NULL',
    botCategoryName:'SELECT ctgr_name FROM category WHERE top_ctgr_no = ?'

}
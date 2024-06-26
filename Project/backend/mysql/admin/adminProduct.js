module.exports = {

    prodList : `select p.*, c.ctgr_name 
                from product p join category c 
                               on p.ctgr_no = c.ctgr_no`,
    
}
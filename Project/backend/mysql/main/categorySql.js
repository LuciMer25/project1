module.exports = {
       TopCategoryName:`SELECT ctgr_name, 
                            ctgr_no 
                     FROM category 
                     WHERE top_ctgr_no IS NULL`,
       // BotCategoryName:`SELECT a_ctgr.ctgr_name, 
       //                      a_ctgr.top_ctgr_no 
       //               FROM category AS a_ctgr 
       //               INNER JOIN category AS b_ctgr 
       //               ON a_ctgr.top_ctgr_no = b_ctgr.ctgr_no`,
       FirstCategory:`SELECT b.ctgr_name,
                             b.top_ctgr_no
                      FROM category AS a
                      INNER JOIN category AS b
                      WHERE a.ctgr_no = 1
                      AND b.top_ctgr_no = 1;`,
       SecondCategory:`SELECT b.ctgr_name,
                             b.top_ctgr_no
                      FROM category AS a
                      INNER JOIN category AS b
                      WHERE a.ctgr_no = 2
                      AND b.top_ctgr_no = 2;`,
       // ------------------------------------------------------------
       UpCategory1:`SELECT ctgr_name FROM category WHERE ctgr_no = 1`,
       DownCategory1:`SELECT ctgr_name FROM category WHERE top_ctgr_no = 1`,
       UpCategory2:`SELECT ctgr_name FROM category WHERE ctgr_no = 2`,
       DownCategory2:`SELECT ctgr_name FROM category WHERE top_ctgr_no = 2`,
       UpCategory3:`SELECT ctgr_name FROM category WHERE ctgr_no = 3`,
       DownCategory3:`SELECT ctgr_name FROM category WHERE top_ctgr_no = 3`,
       UpCategory4:`SELECT ctgr_name FROM category WHERE ctgr_no = 4`,
       DownCategory4:`SELECT ctgr_name FROM category WHERE top_ctgr_no = 4`,
       UpCategory5:`SELECT ctgr_name FROM category WHERE ctgr_no = 5`,
       DownCategory5:`SELECT ctgr_name FROM category WHERE top_ctgr_no = 5`,

}
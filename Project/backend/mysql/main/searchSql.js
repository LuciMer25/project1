module.exporst = {
    SearchResult : `SELECT ctgr_name
                    FROM category
                    WHERE ctgr_name LIKE ?%
                    AND top_ctgr IS NOT NULL`
}
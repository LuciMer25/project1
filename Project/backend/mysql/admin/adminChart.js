module.exports = {

    categoryChart : `SELECT c2.ctgr_name AS "chart_name",
                            SUM(o.order_total_amount) AS "chart_value"
                    FROM orders o JOIN order_detail d 
                                  ON o.order_no = d.order_no
                                  JOIN order_state ods 
                                  ON o.order_no = ods.order_no
                                  JOIN product p 
                                  ON p.prod_no = d.prod_no
                                  JOIN category c 
                                  ON c.ctgr_no = p.ctgr_no
                                  LEFT JOIN category c2 
                                  ON c.top_ctgr_no = c2.ctgr_no
                    WHERE ods.buy_complete_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
                    GROUP BY c2.ctgr_name
                    ORDER BY chart_value DESC`,

    IntervalChart : `SELECT DATE(ods.buy_complete_date) AS chart_date,
                            SUM(o.order_total_amount) AS chart_value
                     FROM orders o JOIN order_state ods 
                                   ON o.order_no = ods.order_no
                     WHERE DATE(ods.buy_complete_date) >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
                     GROUP BY DATE(ods.buy_complete_date)
                     ORDER BY DATE(ods.buy_complete_date);`

}
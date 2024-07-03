const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');

router.get("/categoryChart", async (req, res) => {
    try {
        let list = await query("categoryChart");
        res.send({ list });
    } catch (error) {
        console.error("Error fetching category chart data:", error);
        res.status(500).send("Server Error");
    }
});

router.get("/IntervalChart", async (req, res) => {
    try {
        let list = await query("IntervalChart");
        res.send({ list });
    } catch (error) {
        console.error("Error fetching interval chart data:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
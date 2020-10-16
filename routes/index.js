const express = require('express');
const router = express.Router();
const pool = require('./../db');


router.post('/saveSession', async function (req, res) {
    try {
        const {sessionElapsedTime} = req.body
        const savedSession = await pool.query(
            "INSERT INTO session (sessionElapsedTime) VALUES($1)"
            , [sessionElapsedTime]);
        res.send(savedSession)

    } catch (err) {
        console.error(err.message)
    }
});

module.exports = router;

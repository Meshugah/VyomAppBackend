const express = require('express');
const router = express.Router();
const makeCall = require('./Makecall.js');
const pool = require('./../db')


router.post('/call', async function (req, res, next) {
    console.log(req.body)

    // todo uncomment Plivo
    // makeCall()

    try {
        const {name, phoneNumber, callDuration} = req.body
        const savedSession = await pool.query(
            "INSERT INTO sessions (name, phonenumber, callduration) VALUES($1, $2, $3)"
            , [name, phoneNumber, callDuration]);


        res.send("Done!")
    } catch (err) {
        console.error(err.message)
    }
});

module.exports = router;

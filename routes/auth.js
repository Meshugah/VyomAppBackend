const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./../db');


router.post('/register', async (req, res) => {
    const {name, phoneNumber, password} = req.body;

    try {
        const userExistsAlready = await pool.query("SELECT * FROM users WHERE phoneNumber = $1", [phoneNumber])
        if (userExistsAlready.rows.length > 0) return res.status(400).send("Phone number Already Exists")
    } catch (err) {
        console.error(err.message)
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)


    try {
        const savedUser = await pool.query(
            "INSERT INTO users (name, phoneNumber, password) VALUES($1, $2, $3) RETURNING *"
            , [name, phoneNumber, hash]);

        const token = jwt.sign({_id: savedUser.rows[0].user_id}, process.env.TOKEN_SECRET)
        res.header('authToken', token).status(200).send(token)
    } catch (err) {
        res.status(400).send(err.message)
    }
});


router.post("/login", async (req, res, next) => {
    const {phoneNumber, password} = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE phoneNumber = $1", [phoneNumber])
        if (user.rows.length === 0) return res.status(400).send("User not on the Platform")


        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(400).send("Incorrect Password")

        const token = jwt.sign({_id: user.rows[0].user_id}, process.env.TOKEN_SECRET)
        res.header('authToken', token).send(token);
    } catch (e) {
        throw (e)
    }
});


module.exports = router;


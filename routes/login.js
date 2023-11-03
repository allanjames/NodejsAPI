const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {   
    res.status(201).json({
        message: process.env.ACCESS_TOKEN_SECRET
    });
});

module.exports = router;
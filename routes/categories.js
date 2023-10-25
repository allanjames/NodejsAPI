const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => { 
    res.status(200).json({
        message: "Retrieving all blog categories"
    });
});

router.post('/', (req, res, next) => { 
    res.status(200).json({
        message: "Added new category"
    });
});

module.exports = router;
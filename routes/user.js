const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

router.post('/', (req, res, next) => {  
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            })
        } else {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                User.find({ email: user.email }).then((found) => {
                    
                    if(found.length >= 1) {
                        res.send({
                            message: "User " + user.email + " already exists in the database."
                        })
                    } else {
                        user.save().then((result)=>{
                            res.send({
                                message: "New user added",
                                details: result
                            })
                        }).catch((error)=> { console.log(error) });
                    }
                })
        }
    });
});

module.exports = router;
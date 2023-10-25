const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');
const Error = require('../util/error');

router.get('/', (req, res, next) => { 
   
    Blog.find()
    .then(
        (articles)=>{
            const response = { 
                count: articles.length,
                articles: articles.map( data => {
                    return {
                        id: data._id,
                        title: data.title,
                        body: data.body,
                        created: data.createdAt
                    }
                })
            }
            res.send(response)
        }).catch((error)=> { console.log(error) }
    );
});

router.get('/article/:id', (req, res, next) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(article => {
            res.status(200).json(article);
        })
        .catch(error => {
            //let exception = new Error(error);
            //console.log(error);
            res.status(404).json({ message: "Article " + id + " does not exist" }); //exception.errorHandler(error)
        })
});

router.delete('/article/:id', (req, res, next) => {
    const id = req.params.id;
    Blog.findOneAndRemove({ _id: id })
        .then(article => {
            res.status(200).json({
                message: "Deleted article " + article._id
            });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.patch('/article/:id', (req, res, next) => {
    const id = req.params.id;
    const updates = {};
    for(const options of req.body) {
        updates[options.propName] = options.value;
    }
    Blog.update({ _id: id }, { $set: updates})
        .then(result=>{
            res.status(200).json({
                message: "Updated article " + result._id
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error });
        })
});

router.post('/', (req, res, next) => {   
    const blog = new Blog({
        title: req.body.title,
        body: req.body.body
    });
    blog.save().then((result)=>{
        res.send({
            message: "Posted new article",
            details: result
        })
    }).catch((error)=> { console.log(error) });
});

module.exports = router;
const db = require('../config/db');
const fs = require('fs');

// Get all posts
exports.getAllPosts = (req, res, next) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, result) => {
        if(err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json({ result });
    });
};

// Get post by ID
exports.getOnePost = (req, res, next) => {
    const sql = 'SELECT * FROM posts WHERE idPosts = ?';
    const idPost = req.params.id;
    db.query(sql, idPost, (err, result) => {
        if(err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json({ result });
    });
};

// Create post
exports.createPost = (req, res, next) => {
    console.log(req.body);
    const postObject = JSON.parse(req.body);
    console.log(postObject);
    const post = {
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    };
    const sql = ('INSERT INTO posts SET ?');
    db.query(sql, post, (err, result) => {
        if(err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(201).json({ message:'Post créé !'});
    });
};
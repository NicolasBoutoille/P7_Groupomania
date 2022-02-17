const db = require('../config/db');
const fs = require('fs');

// Get all posts
exports.getAllPosts = (req, res, next) => {
    const sql = 'SELECT * FROM posts order by dateOfPost DESC';
    db.query(sql, (err, result) => {
        if (err) {
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
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json({ result });
    });
};

// Create post
exports.createPost = (req, res, next) => {
    let { body, file } = req;
    const sql = ('INSERT INTO posts SET ?');
    if (!file) {
        const post = {
            ...body
        };
        db.query(sql, post, (err, result) => {
            if (err) {
                res.status(404).json({ err });
                throw err;
            }
            res.status(201).json({ message: 'Post créé !' });
        });
    } else {
        const post = {
            ...body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
        db.query(sql, post, (err, result) => {
            if (err) {
                res.status(404).json({ err });
                throw err;
            }
            res.status(201).json({ message: 'Post créé !' });
        });
    }
};

// Modify Post
exports.modifyPost = (req, res, next) => {
    let { body, file } = req;
    const postId = req.params.id;
    const sqlUpdate = `UPDATE posts SET ? WHERE idPosts = ${postId}`;
    if (file) {
        const post = {
            ...body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
        db.query(sqlUpdate, post, (err, result) => {
            if (err) {
                res.status(404).json({ err });
                throw err;
            }
            res.status(200).json({ message: 'Post modifié !' })
        });
    } else {
        const post = {
            ...body
        };
        db.query(sqlUpdate, post, (err, result) => {
            if (err) {
                res.status(404).json({ err });
                throw err;
            }
            res.status(200).json({ message: 'Post modifié !' })
        });
    }
};

// Delete Post
exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    const sqlSelect = 'SELECT * FROM posts WHERE idPosts = ?';
    db.query(sqlSelect, postId, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        const post = result[0];
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            const sqlDelete = 'DELETE FROM posts WHERE idPosts = ?';
            db.query(sqlDelete, postId, (err, result) => {
                if (err) {
                    res.status(404).json({ err });
                    throw err;
                }
                res.status(200).json({ message: 'Post supprimé !' })
            })
        })
    })
};

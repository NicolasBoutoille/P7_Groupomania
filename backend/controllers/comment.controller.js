const db = require('../config/db');

// Get all comments
exports.getAllComments = (req, res, next) => {
    const sql = 'SELECT * FROM groupomania.comments ORDER BY dateOfComment DESC;';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json({ result });
    });
};

// Get comment by ID
exports.getOneComment = (req, res, next) => {
    const sql = 'SELECT * FROM comments LEFT JOIN users ON comments.idUsers = users.idUsers WHERE idPosts = ? ORDER BY dateOfComment DESC;';
    const postId = req.params.id;
    db.query(sql, postId, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json({ result });
    });
};

// Create comment
exports.createComment = (req, res, next) => {
    const sql = 'INSERT INTO comments SET ?';
    const comment = {
        ...req.body
    };
    db.query(sql, comment, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(201).json({ message: 'Commentaire créé !' });
    });
};

// Modify Comment
exports.modifyComment = (req, res, next) => {
    const commentId = req.params.id;
    const sql = `UPDATE comments SET ? WHERE idComments = ${commentId}`;
    const comment = {
        ...req.body
    };
    db.query(sql, comment, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json({ message: 'Commentaire modifié !' });
    });
};

// Delete comments
exports.deleteComment = (req, res, next) => {
    const commentId = req.params.id;
    const sql = 'DELETE FROM comments WHERE idComments = ?';
    db.query(sql, commentId, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json({ message: 'Commentaire supprimé !' });
    });
};
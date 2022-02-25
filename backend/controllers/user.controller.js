const db = require('../config/db');
const fs = require('fs');
const bcrypt = require('bcrypt');

// Get user profile
exports.getOneUser = (req, res, next) => {
    const sql = 'SELECT * FROM users WHERE idUsers = ?';
    const userId = req.params.id;
    db.query(sql, userId, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json({ result });
    });
};

exports.updateUser = (req, res, next) => {
    let { body, file } = req;
    const userId = req.params.id;
    const sqlUpdate = `UPDATE users SET ? WHERE idUsers = ${userId}`;
    if (file) {
        const user = {
            ...body,
            profilePicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
        db.query(sqlUpdate, user, (err, result) => {
            if (err) {
                res.status(404).json({ err });
                throw err;
            }
            res.status(200).json({ message: 'Profil modifié !' })
        });
    } else if (req.body.password !== null){
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = {
                    ...req.body,
                    password: hash,
                };
                db.query(sqlUpdate, user, (err, result) => {
                    if (err) {
                        res.status(404).json({ err });
                        throw err;
                    }
                    res.status(200).json({ message: 'Profil modifié !' })
                });
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        const user = {
            ...body
        };
        db.query(sqlUpdate, user, (err, result) => {
            if (err) {
                res.status(404).json({ err });
                throw err;
            }
            res.status(200).json({ message: 'Profil modifié !' })
        });
    }
};

// Delete user profile
exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    const sqlSelect = 'SELECT * FROM users WHERE idUsers = ?';
    db.query(sqlSelect, userId, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        const user = result[0];
        const sqlDelete = 'DELETE FROM users WHERE idUsers = ?';
        if (user.profilePicture != null) {
            const filename = user.profilePicture.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                db.query(sqlDelete, userId, (err, result) => {
                    if (err) {
                        res.status(404).json({ err });
                        throw err;
                    }
                    res.status(200).json({ message: 'Utilisateur supprimé !' });
                });
            });
        } else {
            db.query(sqlDelete, userId, (err, result) => {
                if (err) {
                    res.status(404).json({ err });
                    throw err;
                }
                res.status(200).json({ message: 'Utilisateur supprimé !' });
            });
        }
    });
};
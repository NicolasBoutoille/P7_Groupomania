const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Create user
exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                ...req.body,
                password: hash
            };
            console.log(req.body);
            const sql = 'INSERT INTO users SET ?';
            db.query(sql, user, (err, result) => {
                if (!result) {
                    res.status(400).json({ err: 'L\'email ou le nom d\'utilisateur est déjà utilisé' });
                } else {
                    res.status(201).json({ message: 'Utilisateur créé !' });
                };
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Login user
exports.login = (req, res, next) => {
    const user = {
        ...req.body
    };
    const email = user.email;
    const sqlFind = 'SELECT * FROM users WHERE email = ?';
    db.query(sqlFind, email, (err, result) => {
        if (err) {
            return res.status(404).json({ err });
        }
        else if (result.length === 0) {
            res.status(401).json({ err: 'Utilisateur non trouvé !' });
        }
        else {
            const userFounded = result[0];
            const password = userFounded.password;
            bcrypt.compare(req.body.password, password)
                .then(valid => {
                    //console.log(valid);
                    if (!valid) {
                        return res.status(401).json({ err: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: userFounded.idUsers,
                        token: jwt.sign(
                            { userId: userFounded.idUsers },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        }
    });
};


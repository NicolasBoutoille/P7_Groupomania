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
        db.query(sql, user, function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: 'Utilisateur créé !'});
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
    const sqlFind = 'SELECT * FROM users WHERE ?';
    db.query(sqlFind, email, function (err, result) {
        if (err)
            return res.status(401).json({ error : 'Utilisateur non trouvé !'});
        console.log(req.body.password);
        console.log(user.password);
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId : user._id },
                        process.env.TOKEN,
                        { expiresIn: '24h' }
                    )
                })
            .catch(error => res.status(500).json({ error }));
            });
    });
};


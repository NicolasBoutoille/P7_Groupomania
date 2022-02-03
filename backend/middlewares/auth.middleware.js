const jwt = require('jsonwebtoken');

// Vérification de l'authentification
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        req.token = jwt.verify(token, process.env.TOKEN);
        if (req.body.userId && req.body.userId !== req.token.userId) {
            throw '403: unauthorized request';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
};
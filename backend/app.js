const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/db');
const helmet = require('helmet');

// Importation des routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commmentRoutes = require('./routes/comment.route');

// Middleware CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(helmet());

// On indique a Express qu'à chaque requête vers la route /images il faut gérer la ressource de manière statique dans le dossier
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commmentRoutes);

module.exports = app;
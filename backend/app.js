const express = require('express');
const app = express();
const db = require('./config/db');

// Importation des routes
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

// // Connexion a la base de données
// const db = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connecté a la base de données MySQL !");
// });

// Middleware CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
const express = require('express');
const app = express();
require('dotenv').config({path: './config/.env'})
const mysql = require('mysql2');

// Connexion a la base de données
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté a la base de données MySQL !");
});

// Middleware CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/user', (req, res, next) => {
    const user = [
        {
            _id: '3524324',
            name: 'Nicolas',
            email: 'test@gmail.com',
        },
    ];
    res.status(200).json(user);
});

module.exports = app;
const mysql = require('mysql2');
require('dotenv').config({path: './config/.env'});

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté a la base de données MySQL !");
});

module.exports = db;
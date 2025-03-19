const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

db.connect((err) => {
    if (err) console.error("Database Connection Failed!", err);
    else console.log("Connected to Database");
});

module.exports = db;

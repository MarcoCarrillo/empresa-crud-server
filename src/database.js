const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'empresa'
});

mysqlConnection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('DB connection established');
    }
}) ;

module.exports = mysqlConnection;
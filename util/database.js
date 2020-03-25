const mysql = require('mysql2');

// connect to a database peoplebook running on your localmachine
const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'lshZEicHnk',
    database: 'lshZEicHnk',
    password: 'WqYoOnzCgR'
});

module.exports = pool.promise();
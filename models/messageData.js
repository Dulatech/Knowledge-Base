let db = require('../util/database');

// Add a single individual to the database
function getAllMessages(id) {
    let sql = 'select * from message where senderId = ' + id + ' OR recieverId = ' + id;
    return db.query(sql);
}

module.exports = {
    gelAll: getAllMessages
}
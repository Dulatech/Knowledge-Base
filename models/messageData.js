let db = require('../util/database');

// Add a single individual to the database
function getAllMessages(id) {
    let sql = 'select *, to_char(datesent, \'DD Mon YY\') as date_format from message where senderId = ' + id + ' OR recieverId = ' + id;
    return db.query(sql);
}

module.exports = {
    gelAll: getAllMessages
}
let db = require('../util/database');

// Add a single individual to the database
function getSelectedMessageReplies(id) {
    let sql = 'Select *, to_char(datesent, \'DD Mon YY HH:MI\') as date_format from messagereply where messageid = ' + id;
    return db.query(sql);
}

module.exports = {
    getSelectedMessage: getSelectedMessageReplies
}
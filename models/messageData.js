let db = require('../util/database');

// Add a single individual to the database
function getAllMessages(id) {
    let sql = 'select *, to_char(datesent::timestamptz at time zone \'pst8pdt\', \'DD Mon YY\') as date_format from message where senderId = ' + id + ' OR recieverId = ' + id;
    return db.query(sql);
}

function createMessage(data) {
    let sql = "insert into message (senderid, recieverid, subject) values('" + data.senderid + "', '" + data.recieverid + "', '" + data.subject + "') returning id";
    return db.query(sql);
}

function getUserMsgNum(id) {
    return db.query('Select count(id) as messages from message where senderid = ' + id + ' OR recieverid = ' + id);
}

module.exports = {
    gelAll: getAllMessages,
    create: createMessage,
    msgNum: getUserMsgNum
}
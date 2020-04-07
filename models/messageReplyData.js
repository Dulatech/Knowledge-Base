let db = require('../util/database');

// Add a single individual to the database
function getSelectedMessageReplies(id) {
    let sql = 'Select *, to_char(datesent::timestamptz at time zone \'pst8pdt\', \'DD Mon YY HH:MI\') as date_format from messagereply where messageid = ' + id;
    return db.query(sql);
}

function addReply(msgId, senderId, rcvrId, reply) {
    let sql = "Insert into messagereply (messageid, senderid, recieverid, body) values ('" + msgId + "','"+ senderId + "','" + rcvrId + "','" + reply + "')";
    return db.query(sql);
}

module.exports = {
    getSelectedMessage: getSelectedMessageReplies,
    addReply: addReply
}
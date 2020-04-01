let db = require('../util/database');

// Add a single individual to the database
function addDiscReply(data) {
    let sql = "Insert into discussionreply (userid, discussionid, body) values (" + data.userid + "," + data.discussionid + ",'" + data.body + "')";
    return db.query(sql);
}

function getDiscussionsReplies(id) {
    return db.query('Select discussionreply.id, userid, discussionid, imageurl, body, to_char(dateposted, \'DD mon YYYY\') as re_format from discussionreply, users WHERE discussionreply.userid = users.id AND discussionid = ' + id  + ' order by id ASC');
}

function getDiscussionsRepliesCount(id) {
    return db.query('Select count(id) as repliesnum from discussionreply WHERE discussionid = ' + id);
}

module.exports = {
    addr: addDiscReply,
    allreplies: getDiscussionsReplies,
    repliesnum: getDiscussionsRepliesCount
}
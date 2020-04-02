let db = require('../util/database');


function getAllDiscussions(limit, offset, topic) {
    return db.query('Select discussion.id, userid, imageurl, title, body, topic, to_char(dateposted, \'DD mon YYYY\') as re_format from discussion, users WHERE discussion.userid = users.id AND topic like \'%' + topic + '%\' order by id DESC LIMIT ' + limit + ' OFFSET ' + offset);
}

// Add a single individual to the database
function addDisc(data) {
    let sql = "Insert into discussion (userid, title, body, topic) values (" + data.userid + ",'" + data.title + "','" + data.body + "','" + data.topic + "')";
    return db.query(sql);
}

function getUserPostNum(id) {
    return db.query('Select count(id) as posts from discussion where userid = ' + id);
}

function getPostNum(topic) {
    return db.query('Select count(id) as posts from discussion WHERE topic like \'%' + topic + '%\'');
}

module.exports = {
    add: addDisc,
    getall: getAllDiscussions,
    getposts: getUserPostNum,
    getallposts: getPostNum
}
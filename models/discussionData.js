let db = require('../util/database');


function getAllDiscussions() {
    return db.query('Select discussion.id, userid, imageurl, title, body, topic, to_char(dateposted, \'DD mon YYYY\') as re_format from discussion, users WHERE discussion.userid = users.id order by id DESC');
}

// Add a single individual to the database
function addDisc(data) {
    let sql = "Insert into discussion (userid, title, body, topic) values (" + data.userid + ",'" + data.title + "','" + data.body + "','" + data.topic + "')";
    return db.query(sql);
}

function getUserPostNum(id) {
    return db.query('Select count(title) as posts from discussion where userid = ' + id);
}

module.exports = {
    add: addDisc,
    getall: getAllDiscussions,
    getposts: getUserPostNum
}
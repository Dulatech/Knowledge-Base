let db = require('../util/database');


function getAllDiscussions(limit, offset, topic) {
    return db.query('Select discussion.id, userid, imageurl, title, body, topic, to_char(dateposted::timestamptz at time zone \'pst8pdt\', \'DD mon YYYY\') as re_format from discussion, users WHERE discussion.userid = users.id AND topic like \'%' + topic + '%\' order by dateposted DESC LIMIT ' + limit + ' OFFSET ' + offset);
}

function getUserDiscussions(limit, offset, id) {
    return db.query('Select discussion.id, userid, imageurl, title, body, topic, to_char(dateposted::timestamptz at time zone \'pst8pdt\', \'DD mon YYYY\') as re_format from discussion, users WHERE discussion.userid = users.id AND userid =' + id + ' order by dateposted DESC LIMIT ' + limit + ' OFFSET ' + offset);
}

function getSearchedDiscussions(limit, offset, search) {
    return db.query('Select discussion.id, userid, imageurl, title, body, topic, to_char(dateposted::timestamptz at time zone \'pst8pdt\', \'DD mon YYYY\') as re_format from discussion, users WHERE discussion.userid = users.id AND title ilike \'%' + search + '%\' order by dateposted DESC LIMIT ' + limit + ' OFFSET ' + offset);
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

function getSearchPostNum(search) {
    return db.query('Select count(id) as posts from discussion WHERE title ilike \'%' + search + '%\'');
}

module.exports = {
    add: addDisc,
    getall: getAllDiscussions,
    getuserdisc: getUserDiscussions,
    getposts: getUserPostNum,
    getallposts: getPostNum,
    getsearched: getSearchedDiscussions,
    getsearchednum: getSearchPostNum
}
let db = require('../util/database');

// Add a single individual to the database
function getCount(uid, pid) {
    return db.query('Select count(id) as likes from likes where likedid = ' + uid + ' and likerid =' + pid);
    
}

function like(data) {
    let sql = "Insert into likes (likedid, likerid) values (" + data.likedid + "," + data.likerid + ")";
    return db.query(sql);
}

function dislike(data) {
    return db.query("Delete from likes where likedid= " + data.likedid + " and likerid = " + data.likerid);
}

module.exports = {
    liked: getCount,
    like: like,
    dislike: dislike 

}
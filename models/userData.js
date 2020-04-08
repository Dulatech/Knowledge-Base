let db = require('../util/database');

// Add a single individual to the database
function loadUser(id) {
    return db.query("Select *, id as userid, to_char(dob, \'yyyy-mm-dd\') as re_format from Users where id = " + id);
}

function editUser(data) {
    return db.query("Update Users SET imageurl = '" + data.imageurl + "', firstname = '" 
    + data.firstname + "', lastname = '" + data.lastname + "', country = '" 
    + data.country + "', dob = '" + data.dob + "', about = '" + data.about + "' WHERE id =" + data.id);
}

function incUserLikes(id) {
    return db.query("Update Users SET likes = likes + 1  WHERE id =" + id);
}

function decUserLikes(id) {
    return db.query("Update Users SET likes = likes - 1  WHERE id =" + id);
}

module.exports = {
    load: loadUser,
    edit: editUser,
    inc: incUserLikes,
    dec: decUserLikes
}
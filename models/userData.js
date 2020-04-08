let db = require('../util/database');

// Add a single individual to the database
function loadUser(id) {
    return db.query("Select *, to_char(dob, \'yyyy-mm-dd\') as re_format from Users where id = " + id);
}

function editUser(data) {
    return db.query("Update Users SET imageurl = '" + data.imageurl + "', firstname = '" 
    + data.firstname + "', lastname = '" + data.lastname + "', country = '" 
    + data.country + "', dob = '" + data.dob + "', about = '" + data.about + "' WHERE id =" + data.id);
}

function likeUser(data){
    return db.query("Update Users SET likes'" + data.likes + 1 + "' WHERE id =" + data.id);
}

module.exports = {
    load: loadUser,
    edit: editUser,
    like: likeUser
}
let db = require('../util/database');

// Add a single individual to the database
function loadUser(id) {
    return db.query("Select * from Users where id = " + id);
}


module.exports = {
    load: loadUser
}
let db = require('../util/database');

// Add a single individual to the database
function addSomeone(data) {
    let sql = "Insert into test (name, about, imageURL) values ('" + data.name + "','" + data.about + "','" + data.imageURL + "')";
    return db.execute(sql);
}

module.exports = {
    add: addSomeone
}
let userModel = require('../models/userData');

exports.profileEditor = async (req, res, next) => {
    let Users = await userModel.load(req.session.u_id);

    res.render('editUser', {
        user: Users.rows[0],
        trueEditCSS: true
     });
};

exports.editProfile = async (req, res, next) => {
    let u_id = req.session.u_id;
    let u_imageurl = req.body.imageurl;
    let u_first = req.body.firstname;
    let u_last = req.body.lastname;
    let u_country = req.body.country;
    let u_dob = req.body.dob;
    let u_about = req.body.about;
    let uObject = {
        id: u_id,
        imageurl: u_imageurl,
        firstname: u_first,
        lastname: u_last,
        country: u_country,
        dob: u_dob,
        about: u_about
     }
     console.log(uObject);
    let User = await userModel.edit(uObject);
    res.redirect(301, "/discussion");
};
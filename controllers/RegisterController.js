let userModel = require('../models/userData');

exports.transport = async (req, res, next) => {
      req.session.fname = req.body.firstname;
      req.session.lname = req.body.lastname;
      req.session.email = req.body.email;
      req.session.password = req.body.password;
      req.session.cpassword = req.body.confirmpassword;

      if(req.session.password != req.body.password){
        res.render('login');
      }

      let id = await userModel.user(req.session.email);
      if(id.rows[0].users > 0){
        res.render('login');
      }

      res.render('register');
};

exports.createUser = async (req, res, next) => {
    req.session.imgurl = req.body.imgurl;
    req.session.about = req.body.about;
    req.session.country = req.body.country;
    req.session.dob = req.body.date;

    let userObject = {
      firstname: session.fname,
      lastname: session.lname,
      email: session.email,
      password: session.password,
      about: session.about,
      imageURL: session.imgurl,
      dob: session.dob,
      country: session.country;
    }

    let user = await userModel.createUser(userObject);
}

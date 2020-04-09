let userModel = require('../models/userData');

exports.transport = async (req, res, next) => {
      req.session.fname = req.body.firstname;
      req.session.lname = req.body.lastname;
      req.session.email = req.body.email;
      req.session.password = req.body.password;
      req.session.cpassword = req.body.confirmpassword;

      let id = await userModel.user(req.session.email);
      console.log(id.rows[0].users);
      console.log(req.session.password + "   " + req.session.cpassword);
      if((id.rows[0].users > 0)){
        res.render('login', {
          trueExist: true
        });
      } else if ((req.session.password != req.session.cpassword)){
        res.render('login', {
          trueSame: true
        });
      } else{
        res.render('register', {
        });
      }
     
};

exports.createUser = async (req, res, next) => {
  if (req.session.email) {
    var imgurl = req.body.imgurl;
    var about = req.body.about;
    var country = req.body.country;
    var dob = req.body.date;

    let userObject = {
      firstname: req.session.fname,
      lastname: req.session.lname,
      email: req.session.email,
      password: req.session.password,
      about: about,
      imageurl: imgurl,
      dob: dob,
      country: country
    }

    req.session.fname = null;
    req.session.lname = null;
    req.session.email = null;
    req.session.password = null;
    req.session.cpassword = null;

    let user = await userModel.create(userObject);
    req.session.u_id = user.rows[0].id;
    req.session.page = 0;
    res.redirect(301, '/discussion');
  } else {
    res.render('login', { });
}

}

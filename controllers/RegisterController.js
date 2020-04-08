let userModel = require('../models/userData');

exports.transport = async (req, res, next) => {
      let fname = req.body.firstname;
      let lname = req.body.lastname;
      let email = req.body.email;
      let password = req.body.password;
      let cpassword = req.body.confirmpassword;

      if(password != cpassword){
        res.render('login');
      }

      let id = await userModel.user(email);
      if(id.rows[0].users > 0){
        res.render('login');
      }

      res.render('register');
};

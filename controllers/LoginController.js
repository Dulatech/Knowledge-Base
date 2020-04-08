let userModel = require('../models/userData');

exports.transport = async (req, res, next) => {
      var email = req.body.email;
      var password = req.body.password;
      console.log(email + " " + password);
      let id = await userModel.validuser(email, password);
      if((id.rows[0].users > 0)){
            
            let user = await userModel.getuser(email, password);
            req.session.u_id = user.rows[0].id;
            req.session.page = 0;
            res.redirect(301, '/discussion');
          } else {
            res.render('login', {
            });
          }
      
};

exports.logout = async (req, res, next) => {
      req.session.destroy((err) => {
            if (err) {
               return console.log(err);
            }
            res.render('login', {
               
            });
         });
};
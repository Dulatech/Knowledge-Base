let userModel = require('../models/userData');

exports.transport = async (req, res, next) => {
      u_id = 1;
      req.session.u_id = u_id;
      req.session.page = 0;
      res.redirect(301, '/discussion');
};
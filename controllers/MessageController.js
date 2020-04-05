let messageDataModel = require('../models/messageData');
let messageReplyDataModel = require('../models/messageReplyData')
let userDataModel = require('../models/userData')

var Messages;

exports.getAllMessages =  async (req, res, next) => {
  // future: need to use req.session idhere instead of 1!
    Messages = await messageDataModel.gelAll(req.session.u_id);
    
    for (let i = 0; i < Messages.rows.length; i ++) {
      var User;
      // use req.session id
      if (Messages.rows[i].senderid != req.session.u_id) {
        User = await userDataModel.load(Messages.rows[i].senderid);
      }
      else {
        User = await userDataModel.load(Messages.rows[i].recieverid);
      }

      Messages.rows[i]["imgurl"] =  User.rows[0].imageurl;
      Messages.rows[i]["name"] = User.rows[0].firstname + ' ' + User.rows[0].lastname;
    }

    res.render("messages", {
      trueMessageCSS: true,
      msg: Messages.rows
    });
 };

 exports.gelSelectedMessage = async (req, res, next) => {
  res.render("messages", {
    trueMessageCSS: true,
    msg: Messages.rows
  });
 };
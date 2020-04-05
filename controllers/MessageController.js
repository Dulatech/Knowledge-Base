let messageDataModel = require('../models/messageData');
let messageReplyDataModel = require('../models/messageReplyData')
let userDataModel = require('../models/userData')

var Messages;

exports.getAllMessages =  async (req, res, next) => {
    Messages = await messageDataModel.gelAll(req.session.u_id);
    
    for (let i = 0; i < Messages.rows.length; i ++) {
      var User;
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
  var Replies = await messageReplyDataModel.getSelectedMessage(req.body.id);
  for (let i = 0; i < Replies.rows.length; i ++) {
    var User = await userDataModel.load(Replies.rows[i].senderid);
    Replies.rows[i]["imgurl"] =  User.rows[0].imageurl;
    Replies.rows[i]["name"] = User.rows[0].firstname + ' ' + User.rows[0].lastname;
  }

  res.render("messages", {
    trueMessageCSS: true,
    msg: Messages.rows,
    selectedMsg: Replies.rows,
    selectedMsgId: req.body.id
  });
 };

 exports.addReply = async (req, res, next) => {
   if (typeof selectedMsg === 'undefined' || selectedMsg === null) {
    res.render("messages", {
      trueMessageCSS: true,
      msg: Messages.rows
    });
    return;
   }
  let senderId = req.session.u_id;
  let reply = req.body.reply;
  let msgId = req.body.id;
  let rcvrId;
  
  var ReplyTemp = await messageReplyDataModel.getSelectedMessage(req.body.id);
  if (ReplyTemp.rows[0].senderid == senderId) {
    rcvrId = ReplyTemp.rows[0].recieverid;
  }
  else {
    rcvrId = ReplyTemp.rows[0].senderid;
  }

  await messageReplyDataModel.addReply(msgId, senderId, rcvrId, reply);

  var Replies = await messageReplyDataModel.getSelectedMessage(req.body.id);
  for (let i = 0; i < Replies.rows.length; i ++) {
    var User = await userDataModel.load(Replies.rows[i].senderid);
    Replies.rows[i]["imgurl"] =  User.rows[0].imageurl;
    Replies.rows[i]["name"] = User.rows[0].firstname + ' ' + User.rows[0].lastname;
  }

  res.render("messages", {
    trueMessageCSS: true,
    msg: Messages.rows,
    selectedMsg: Replies.rows,
    selectedMsgId: req.body.id
  });
 }
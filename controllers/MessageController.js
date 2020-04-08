let messageDataModel = require('../models/messageData');
let messageReplyDataModel = require('../models/messageReplyData')
let userDataModel = require('../models/userData')

var Messages;

exports.getMessages =  async (req, res, next) => {
    let u_id = req.session.u_id;
    if (req.params.id == u_id) {
      Messages = await messageDataModel.gelAll(u_id);
    
    for (let i = 0; i < Messages.rows.length; i ++) {
      var User;
      if (Messages.rows[i].senderid != u_id) {
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
    }
    
    else {
        let reciever_id = req.params.id;

        var user = await userDataModel.load(reciever_id);
        var name = user.rows[0].firstname + ' ' + user.rows[0].lastname;

        res.render("createMessage", {
          trueMessageCSS: true,
          name: name,
          recieverid: reciever_id
        });
    }
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
   if (req.body.reply === "" || req.body.reply == null) {
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

 exports.createMessage = async (req, res, next) => {
  let u_id = req.session.u_id;
  let reciever_id = 2;

  var user = await userDataModel.load(reciever_id);
  var name = user.rows[0].firstname + ' ' + user.rows[0].lastname;

  res.render("createMessage", {
    trueMessageCSS: true,
    name: name,
    recieverid: reciever_id
  });

 }

 exports.sendNewMessage = async(req, res, next) => {
  console.log("sender: " + req.session.u_id);
  console.log("reciever: " +req.body.recieverid);
  console.log("subject: " + req.body.subject);
  console.log("body: " + req.body.msgBody);
  let Msg = {
    senderid: req.session.u_id,
    recieverid: req.body.recieverid,
    subject: req.body.subject,   
  }
  
  let messageDetails = await messageDataModel.create(Msg);
  let messageid = messageDetails.rows[0].id;

  let Reply = {
    messageid: messageid,
    senderid: req.session.u_id,
    recieverid: req.body.recieverid,
    body: req.body.msgBody,

  }
  await messageReplyDataModel.create(Reply);
  res.redirect(301, '/discussion');

 }
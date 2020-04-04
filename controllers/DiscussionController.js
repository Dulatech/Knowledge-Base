let userModel = require('../models/userData');
let discussionModel = require('../models/discussionData');
let discussionReplyModel = require('../models/discussionReplyData');

exports.loadHome = async (req, res, next) => {
    let Users = await userModel.load(req.session.u_id);
      let Disc = await discussionModel.getall(5, 0, "");
      req.session.page = 0;
    req.session.topic = "";
      for(var i = 0; i < Disc.rows.length; i++){
          
        let DiscReply = await discussionReplyModel.allreplies(Disc.rows[i].id);
        let DiscReplyNum = await discussionReplyModel.repliesnum(Disc.rows[i].id);
        Disc.rows[i]["replies"] = DiscReply.rows;
        Disc.rows[i]["repliesnum"] = DiscReplyNum.rows[0].repliesnum;
      }
      
      console.log(Disc.rows);
      let DiscPosts = await discussionModel.getposts(req.session.u_id);
        res.render('home', {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            selectedtopic: "All",
            trueNext: true,
            trueHomeCSS: true
         });
        
};

exports.loadHomeByPage = async (req, res, next) => {
    var sTopic = req.session.topic;
    if(sTopic == ""){
        sTopic = "All";
    }
    console.log(sTopic);
    let Users = await userModel.load(req.session.u_id);
    let Disc = await discussionModel.getall(5, req.session.page, req.session.topic);
    for(var i = 0; i < Disc.rows.length; i++){    
        let DiscReply = await discussionReplyModel.allreplies(Disc.rows[i].id);
        let DiscReplyNum = await discussionReplyModel.repliesnum(Disc.rows[i].id);
        Disc.rows[i]["replies"] = DiscReply.rows;
        Disc.rows[i]["repliesnum"] = DiscReplyNum.rows[0].repliesnum;
    }
    console.log(Disc.rows);
    let DiscPosts = await discussionModel.getposts(req.session.u_id);
    let AllPosts = await discussionModel.getallposts(req.session.topic);
    if (AllPosts.rows[0].posts <= 5) {
        res.render('home', {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: false,
            selectedtopic: sTopic,
            trueHomeCSS: true
         });
    }else if(req.session.page <= 0){
      res.render('home', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: false,
          trueNext: true,
          selectedtopic: sTopic,
          trueHomeCSS: true
       });
    } else if (req.session.page + 5 >= AllPosts.rows[0].posts){
      res.render('home', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: true,
          trueNext: false,
          selectedtopic: sTopic,
          trueHomeCSS: true
       });
    } else {
      res.render('home', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: true,
          trueNext: true,
          selectedtopic: sTopic,
          trueHomeCSS: true
       });
    }
 
};

exports.nextPage = async (req, res, next) => {
    req.session.page = req.session.page + 5;
    res.redirect(301, "/discussion/pager");
};

exports.prevPage = async (req, res, next) => {
    req.session.page = req.session.page - 5;
    res.redirect(301, "/discussion/pager");
};

exports.addDiscussion = async (req, res, next) => {
    let u_id = req.session.u_id;
    let d_title = req.body.subject;
    let d_body = req.body.body;
    let d_topic = req.body.topic;
    let dObject = {
        userid: u_id,
        title: d_title,
        body: d_body,
        topic: d_topic
     }
     console.log(dObject);
     let Discussion = await discussionModel.add(dObject);
     req.session.page = 0;
    res.redirect(301, "/discussion");

};

exports.addDiscussionReply = async (req, res, next) => {
    let u_id = req.session.u_id;
    let d_id = req.params.id;
    let dr_body = req.body.body;
    let drObject = {
        userid: u_id,
        discussionid: d_id,
        body: dr_body
     }
     console.log(drObject);
     let Discussion = await discussionReplyModel.addr(drObject);
    res.redirect(301, "/discussion/pager");

};

exports.searchByTopic = async (req, res, next) => {
    let topic = req.body.topic;
    if(topic == "all"){
        topic = "";
    }
    req.session.topic = topic;
    console.log(req.session.topic);
    req.session.page = 0;
    res.redirect(301, "/discussion/pager");
};
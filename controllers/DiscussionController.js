let userModel = require('../models/userData');
let discussionModel = require('../models/discussionData');

exports.loadHome = async (req, res, next) => {
      console.log("hi");
      let Users = await userModel.load(1);
      let Disc = await discussionModel.getall();
      let DiscPosts = await discussionModel.getposts(req.session.u_id);
      console.log(Users.rows[0]);
      res.render('home', {
         user: Users.rows[0],
         disc: Disc.rows,
         discposts: DiscPosts.rows[0] 
      });

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
    res.redirect(301, "/discussion");

};
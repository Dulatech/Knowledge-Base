let userModel = require('../models/userData');
let discussionModel = require('../models/discussionData');

exports.loadHome = async (req, res, next) => {
      let Users = await userModel.load(1);
      let Disc = await discussionModel.getall(5, 0);
      let DiscPosts = await discussionModel.getposts(req.session.u_id);
      let AllPosts = await discussionModel.getallposts();
      req.session.page = 0;
      console.log(AllPosts.rows[0]);
      console.log(Users.rows[0]);
      console.log(req.session.page);
        res.render('home', {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: true
         });
        
};

exports.loadHomeByPage = async (req, res, next) => {
    let Users = await userModel.load(1);
    let Disc = await discussionModel.getall(5, req.session.page);
    let DiscPosts = await discussionModel.getposts(req.session.u_id);
    let AllPosts = await discussionModel.getallposts();
    console.log(AllPosts.rows[0]);
    console.log(Users.rows[0]);
    console.log(req.session.page);
    if(req.session.page <= 0){
      res.render('home', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: false,
          trueNext: true
       });
    } else if (req.session.page + 5 >= AllPosts.rows[0].posts){
      res.render('home', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: true,
          trueNext: false
       });
    } else {
      res.render('home', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: true,
          trueNext: true
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
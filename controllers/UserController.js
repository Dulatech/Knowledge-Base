let userModel = require('../models/userData');
let discussionModel = require('../models/discussionData');
let discussionReplyModel = require('../models/discussionReplyData');

exports.getUser = async(req,res,next)=>{
    let id = req.params.id;
    let Users = await userModel.load(id);
    req.session.page = 0; 
    let Disc = await discussionModel.getuserdisc(5, 0, id);
      for(var i = 0; i < Disc.rows.length; i++){ 
        let DiscReply = await discussionReplyModel.allreplies(Disc.rows[i].id);
        let DiscReplyNum = await discussionReplyModel.repliesnum(Disc.rows[i].id);
        Disc.rows[i]["replies"] = DiscReply.rows;
        Disc.rows[i]["repliesnum"] = DiscReplyNum.rows[0].repliesnum;
      }
      console.log(Disc.rows);
      let DiscPosts = await discussionModel.getposts(id);
      if (DiscPosts.rows[0].posts <= 5) {
        res.render('userPage',  {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: false,
            trueprofilePageCSS: true,
            trueCurrUserPostsCSS: true
         });
        } else {
            res.render('userPage', {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: true,
            trueCurrUserPostsCSS: true,
            trueprofilePageCSS: true
         });
        }
 
};

exports.loadUserPostsByPage = async (req, res, next) => {
    let id = req.params.id;
    console.log("hey");
    let Users = await userModel.load(id);
    let Disc = await discussionModel.getuserdisc(5, req.session.page, id);
    for(var i = 0; i < Disc.rows.length; i++){    
        let DiscReply = await discussionReplyModel.allreplies(Disc.rows[i].id);
        let DiscReplyNum = await discussionReplyModel.repliesnum(Disc.rows[i].id);
        Disc.rows[i]["replies"] = DiscReply.rows;
        Disc.rows[i]["repliesnum"] = DiscReplyNum.rows[0].repliesnum;
    }
    console.log(Disc.rows);
    let DiscPosts = await discussionModel.getposts(id);
    if (DiscPosts.rows[0].posts <= 5) {
        res.render('userPage', {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: false,
            trueCurrUserPostsCSS: true,
            trueprofilePageCSS: true
         });
    }else if(req.session.page <= 0){
      res.render('userPage', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: false,
          trueNext: true,
          trueCurrUserPostsCSS: true,
          trueprofilePageCSS: true
       });
    } else if (req.session.page + 5 >= DiscPosts.rows[0].posts){
      res.render('userPage', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: true,
          trueNext: false,
          trueCurrUserPostsCSS: true,
          trueprofilePageCSS: true
       });
    } else {
      res.render('userPage', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: true,
          trueNext: true,
          trueCurrUserPostsCSS: true,
          trueprofilePageCSS: true
       });
    }
 
};

exports.addDiscussionReply = async (req, res, next) => {
    let id = req.params.userid;
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
    res.redirect(301, "/user/"+ id +"/pager");

};


exports.nextPage = async (req, res, next) => {
    let id = req.params.id;
    req.session.page = req.session.page + 5;
    res.redirect(301, "/user/"+ id +"/pager");
};

exports.prevPage = async (req, res, next) => {
    let id = req.params.id;
    req.session.page = req.session.page - 5;
    res.redirect(301, "/user/"+ id +"/pager");
};
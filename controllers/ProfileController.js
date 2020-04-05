let userModel = require('../models/userData');
let discussionModel = require('../models/discussionData');
let discussionReplyModel = require('../models/discussionReplyData');

exports.getAllCurrentUserPosts = async (req, res, next) => {
    let Users = await userModel.load(req.session.u_id);
    req.session.page = 0; 
    let Disc = await discussionModel.getuserdisc(5, 0, req.session.u_id);
      for(var i = 0; i < Disc.rows.length; i++){ 
        let DiscReply = await discussionReplyModel.allreplies(Disc.rows[i].id);
        let DiscReplyNum = await discussionReplyModel.repliesnum(Disc.rows[i].id);
        Disc.rows[i]["replies"] = DiscReply.rows;
        Disc.rows[i]["repliesnum"] = DiscReplyNum.rows[0].repliesnum;
      }
      console.log(Disc.rows);
      let DiscPosts = await discussionModel.getposts(req.session.u_id);
      if (DiscPosts.rows[0].posts <= 5) {
        res.render('currProfilePosts', {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: false,
            trueHomeCSS: true
         });
        } else {
            res.render('currProfilePosts', {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: true,
            trueCurrUserPostsCSS: true
         });
        }
};

exports.loadCurrentUserPostsByPage = async (req, res, next) => {
    let Users = await userModel.load(req.session.u_id);
    let Disc = await discussionModel.getuserdisc(5, req.session.page, req.session.u_id);
    for(var i = 0; i < Disc.rows.length; i++){    
        let DiscReply = await discussionReplyModel.allreplies(Disc.rows[i].id);
        let DiscReplyNum = await discussionReplyModel.repliesnum(Disc.rows[i].id);
        Disc.rows[i]["replies"] = DiscReply.rows;
        Disc.rows[i]["repliesnum"] = DiscReplyNum.rows[0].repliesnum;
    }
    console.log(Disc.rows);
    let DiscPosts = await discussionModel.getposts(req.session.u_id);
    if (DiscPosts.rows[0].posts <= 5) {
        res.render('currProfilePosts', {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: false,
            trueCurrUserPostsCSS: true
         });
    }else if(req.session.page <= 0){
      res.render('currProfilePosts', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: false,
          trueNext: true,
          trueCurrUserPostsCSS: true
       });
    } else if (req.session.page + 5 >= DiscPosts.rows[0].posts){
      res.render('currProfilePosts', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: true,
          trueNext: false,
          trueCurrUserPostsCSS: true
       });
    } else {
      res.render('currProfilePosts', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: true,
          trueNext: true,
          trueCurrUserPostsCSS: true
       });
    }
 
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
    res.redirect(301, "/profile/posts/pager");

};


exports.nextPage = async (req, res, next) => {
    req.session.page = req.session.page + 5;
    res.redirect(301, "/profile/posts/pager");
};

exports.prevPage = async (req, res, next) => {
    req.session.page = req.session.page - 5;
    res.redirect(301, "/profile/posts/pager");
};

exports.profileEditor = async (req, res, next) => {
    let Users = await userModel.load(req.session.u_id);

    res.render('editUser', {
        user: Users.rows[0],
        trueEditCSS: true
     });
};

exports.editProfile = async (req, res, next) => {
    let u_id = req.session.u_id;
    let u_imageurl = req.body.imageurl;
    let u_first = req.body.firstname;
    let u_last = req.body.lastname;
    let u_country = req.body.country;
    let u_dob = req.body.dob;
    let u_about = req.body.about;
    let uObject = {
        id: u_id,
        imageurl: u_imageurl,
        firstname: u_first,
        lastname: u_last,
        country: u_country,
        dob: u_dob,
        about: u_about
     }
     console.log(uObject);
    let User = await userModel.edit(uObject);
    res.redirect(301, "/discussion");
};
let userModel = require('../models/userData');
let discussionModel = require('../models/discussionData');
let discussionReplyModel = require('../models/discussionReplyData');
let likesModel = require('../models/likeData');

exports.getUser = async(req,res,next)=>{
   //
   if (req.session.u_id) {
    var notSameUser = true;
    var liked = false;
    //
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
      
      let DiscPosts = await discussionModel.getposts(id);
     //
      let Liked = await likesModel.liked(id, req.session.u_id);
      console.log(id + "" + req.session.u_id);
      console.log(Liked.rows[0].likes);
      if (Liked.rows[0].likes > 0){
        liked = true;
      }
      if(req.session.u_id == id){
        notSameUser = false;
      }
//
      if (DiscPosts.rows[0].posts <= 5) {
        res.render('userPage',  {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: false,
            trueprofilePageCSS: true,
            trueCurrUserPostsCSS: true,
            likedTrue: liked,
            notsame: notSameUser
         });
        } else {
            res.render('userPage', {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: true,
            trueCurrUserPostsCSS: true,
            trueprofilePageCSS: true,
            likedTrue: liked,
            notsame: notSameUser
         });
        }
      } else {
        res.render('login', { });
    }
};

exports.loadUserPostsByPage = async (req, res, next) => {
  if (req.session.u_id) {
    var notSameUser = true;
    var liked = false;
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
    
    let DiscPosts = await discussionModel.getposts(id);
    let Liked = await likesModel.liked(id, req.session.u_id);
    console.log(Liked.rows[0].likes);
    if (Liked.rows[0].likes > 0){
      liked = true;
    }
    if(req.session.u_id == id){
      notSameUser = false;
    }
    if (DiscPosts.rows[0].posts <= 5) {
        res.render('userPage', {
            user: Users.rows[0],
            disc: Disc.rows,
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: false,
            trueCurrUserPostsCSS: true,
            trueprofilePageCSS: true,
            likedTrue: liked,
            notsame: notSameUser
         });
    }else if(req.session.page <= 0){
      res.render('userPage', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: false,
          trueNext: true,
          trueCurrUserPostsCSS: true,
          trueprofilePageCSS: true,
          likedTrue: liked,
            notsame: notSameUser
       });
    } else if (req.session.page + 5 >= DiscPosts.rows[0].posts){
      res.render('userPage', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: true,
          trueNext: false,
          trueCurrUserPostsCSS: true,
          trueprofilePageCSS: true,
          likedTrue: liked,
            notsame: notSameUser
       });
    } else {
      res.render('userPage', {
          user: Users.rows[0],
          disc: Disc.rows,
          discposts: DiscPosts.rows[0],
          truePrev: true,
          trueNext: true,
          trueCurrUserPostsCSS: true,
          trueprofilePageCSS: true,
          likedTrue: liked,
            notsame: notSameUser
       });
    }
  } else {
    res.render('login', { });
}
};

exports.addDiscussionReply = async (req, res, next) => {
  if (req.session.u_id) {
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
  } else {
    res.render('login', { });
}

};


exports.nextPage = async (req, res, next) => {
  if (req.session.u_id) {
    let id = req.params.id;
    req.session.page = req.session.page + 5;
    res.redirect(301, "/user/"+ id +"/pager");
  } else {
    res.render('login', { });
}
};

exports.prevPage = async (req, res, next) => {
  if (req.session.u_id) {
    let id = req.params.id;
    req.session.page = req.session.page - 5;
    res.redirect(301, "/user/"+ id +"/pager");
  } else {
    res.render('login', { });
}
};

exports.like = async (req, res, next) => {
  if (req.session.u_id) {
    let id = req.params.id;
    let Like = await userModel.inc(id);
    let likeObject = {
        likedid: id,
        likerid: req.session.u_id
     }
    let Liker = await likesModel.like(likeObject);
    res.redirect(301, "/user/"+ id +"/pager");
  } else {
    res.render('login', { });
}
};

exports.dislike = async (req, res, next) => {
  if (req.session.u_id) {
    let id = req.params.id;
    let Dislike = await userModel.dec(id);
    let likeObject = {
        likedid: id,
        likerid: req.session.u_id
     }
    let Disliker = await likesModel.dislike(likeObject);
    res.redirect(301, "/user/"+ id +"/pager");
  } else {
    res.render('login', { });
}
};
let userModel = require('../models/userData');
let discussionModel = require('../models/discussionData');
let discussionReplyModel = require('../models/discussionReplyData');
let messageModel = require('../models/messageData');

// method to load home page
exports.loadHome = async (req, res, next) => {
    if (req.session.u_id) {
        let Users = await userModel.load(req.session.u_id); // returns user and all info
        let Disc = await discussionModel.getall(5, 0, ""); // returns all the discussions
        req.session.page = 0; // set page to 0 when going to home
        req.session.topic = ""; // set topic to "" when going to home
        for(var i = 0; i < Disc.rows.length; i++){ // for loop to add all the replies to all discussions
            
            let DiscReply = await discussionReplyModel.allreplies(Disc.rows[i].id);
            let DiscReplyNum = await discussionReplyModel.repliesnum(Disc.rows[i].id);
            Disc.rows[i]["replies"] = DiscReply.rows;
            Disc.rows[i]["repliesnum"] = DiscReplyNum.rows[0].repliesnum;
        }
        
        let DiscPosts = await discussionModel.getposts(req.session.u_id); // gets the number of posts made by the signed in user
        let Msgs = await messageModel.msgNum(req.session.u_id);
        if (DiscPosts.rows[0].posts <= 5) {
            res.render('home', {
                user: Users.rows[0],
                disc: Disc.rows,
                discposts: DiscPosts.rows[0],
                msgnum: Msgs.rows[0],
                truePrev: false,
                selectedtopic: "All",
                trueNext: true,
                trueHomeCSS: true
            });
            } else {
                res.render('home', {
                    user: Users.rows[0],
                    disc: Disc.rows,
                    discposts: DiscPosts.rows[0],
                    msgnum: Msgs.rows[0],
                    truePrev: false,
                    selectedtopic: "All",
                    trueNext: false,
                    trueHomeCSS: true
                });
            }
        } else {
            res.render('login', { });
        }
        
};

exports.loadHomeByPage = async (req, res, next) => {
    if (req.session.u_id) {
        var sTopic = req.session.topic;
        if(sTopic == ""){
            sTopic = "All";
        }
        let Users = await userModel.load(req.session.u_id); // returns user and all info
        let Disc = await discussionModel.getall(5, req.session.page, req.session.topic); // returns all the discussions
        for(var i = 0; i < Disc.rows.length; i++){ // for loop to add all the replies to all discussions
            let DiscReply = await discussionReplyModel.allreplies(Disc.rows[i].id);
            let DiscReplyNum = await discussionReplyModel.repliesnum(Disc.rows[i].id);
            Disc.rows[i]["replies"] = DiscReply.rows;
            Disc.rows[i]["repliesnum"] = DiscReplyNum.rows[0].repliesnum;
        }
        let DiscPosts = await discussionModel.getposts(req.session.u_id);  // gets the number of posts made by the signed in user
        let Msgs = await messageModel.msgNum(req.session.u_id);
        let AllPosts = await discussionModel.getallposts(req.session.topic);  // gets the number of posts made all users
        if (AllPosts.rows[0].posts <= 5) { // if less then five total posts
            res.render('home', {
                user: Users.rows[0],
                disc: Disc.rows,
                msgnum: Msgs.rows[0],
                discposts: DiscPosts.rows[0],
                truePrev: false,
                trueNext: false,
                selectedtopic: sTopic,
                trueHomeCSS: true
            });
        }else if(req.session.page <= 0){  // if page is zero
        res.render('home', {
            user: Users.rows[0],
            disc: Disc.rows,
            msgnum: Msgs.rows[0],
            discposts: DiscPosts.rows[0],
            truePrev: false,
            trueNext: true,
            selectedtopic: sTopic,
            trueHomeCSS: true
        });
        } else if (req.session.page + 5 >= AllPosts.rows[0].posts){ // if no more pages
        res.render('home', {
            user: Users.rows[0],
            disc: Disc.rows,
            msgnum: Msgs.rows[0],
            discposts: DiscPosts.rows[0],
            truePrev: true,
            trueNext: false,
            selectedtopic: sTopic,
            trueHomeCSS: true
        });
        } else {
        res.render('home', { // if can go next or previous page
            user: Users.rows[0],
            disc: Disc.rows,
            msgnum: Msgs.rows[0],
            discposts: DiscPosts.rows[0],
            truePrev: true,
            trueNext: true,
            selectedtopic: sTopic,
            trueHomeCSS: true
        });
        }
    } else {
        res.render('login', { });
    }
 
};

exports.nextPage = async (req, res, next) => {
    if (req.session.u_id) {
        req.session.page = req.session.page + 5;
        res.redirect(301, "/discussion/pager");
    } else {
        res.render('login', { });
    }
};

exports.prevPage = async (req, res, next) => {
    if (req.session.u_id) {
        req.session.page = req.session.page - 5;
        res.redirect(301, "/discussion/pager");
    } else {
    res.render('login', { });
    }
};

exports.addDiscussion = async (req, res, next) => {
    if (req.session.u_id) {
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
    } else {
        res.render('login', { });
    }
};

exports.addDiscussionReply = async (req, res, next) => {
    if (req.session.u_id) {
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
    } else {
        res.render('login', { });
    }
};

exports.searchByTopic = async (req, res, next) => {
    if (req.session.u_id) {
    let topic = req.body.topic;
    if(topic == "all"){
        topic = "";
    }
    req.session.topic = topic;
    console.log(req.session.topic);
    req.session.page = 0;
    res.redirect(301, "/discussion/pager");
} else {
    res.render('login', { });
}
};

// search functionality---------------------------------------------------

exports.search = async (req, res, next) => {
    if (req.session.u_id) {
    let search = req.query.search;
    search = search.replace(/ +(?= )/g, "");
    search = search.trim();
    console.log(search);
    let Disc = await discussionModel.getsearched(5, 0, search); // returns all the discussions
    req.session.page = 0;
    req.session.search = search;
      for(var i = 0; i < Disc.rows.length; i++){ // for loop to add all the replies to all discussions
          
        let DiscReply = await discussionReplyModel.allreplies(Disc.rows[i].id);
        let DiscReplyNum = await discussionReplyModel.repliesnum(Disc.rows[i].id);
        Disc.rows[i]["replies"] = DiscReply.rows;
        Disc.rows[i]["repliesnum"] = DiscReplyNum.rows[0].repliesnum;
      }
      
      let DiscPosts = await discussionModel.getsearchednum(search); // gets the number of posts made by the signed in user
      if (DiscPosts.rows[0].posts <= 5) {
        res.render('searchDiscussions', {
            disc: Disc.rows,
            search: req.session.search,
            truePrev: false,
            trueNext: false,
            trueSearchCSS: true
         });
        } else {
            res.render('searchDiscussions', {
            disc: Disc.rows,
            search: req.session.search,
            truePrev: false,
            trueNext: true,
            trueSearchCSS: true
         });
        }
    } else {
        res.render('login', { });
    }
};

exports.loadSearchByPage = async (req, res, next) => {
    if (req.session.u_id) {
    let Disc = await discussionModel.getsearched(5, req.session.page, req.session.search); // returns all the discussions
    for(var i = 0; i < Disc.rows.length; i++){ // for loop to add all the replies to all discussions
        let DiscReply = await discussionReplyModel.allreplies(Disc.rows[i].id);
        let DiscReplyNum = await discussionReplyModel.repliesnum(Disc.rows[i].id);
        Disc.rows[i]["replies"] = DiscReply.rows;
        Disc.rows[i]["repliesnum"] = DiscReplyNum.rows[0].repliesnum;
    }
    let DiscPosts = await discussionModel.getsearchednum(req.session.search);  // gets the number of posts made by the signed in user
   
    if (DiscPosts.rows[0].posts <= 5) { // if less then five total posts
        res.render('searchDiscussions', {
            disc: Disc.rows,
            truePrev: false,
            trueNext: false,
            search: req.session.search,
            trueSearchCSS: true
         });
    }else if(req.session.page <= 0){  // if page is zero
      res.render('searchDiscussions', {
          disc: Disc.rows,
          truePrev: false,
          trueNext: true,
          search: req.session.search,
          trueSearchCSS: true
       });
    } else if (req.session.page + 5 >= DiscPosts.rows[0].posts){ // if no more pages
      res.render('searchDiscussions', {
          disc: Disc.rows,
          truePrev: true,
          trueNext: false,
          search: req.session.search,
          trueSearchCSS: true
       });
    } else {
      res.render('searchDiscussions', { // if can go next or previous page
          disc: Disc.rows,
          truePrev: true,
          trueNext: true,
          search: req.session.search,
          trueSearchCSS: true
       });
    }
} else {
    res.render('login', { });
}
};

exports.nextSearchPage = async (req, res, next) => {
    if (req.session.u_id) {
    req.session.page = req.session.page + 5;
    res.redirect(301, "/discussion/search/pager");
} else {
    res.render('login', { });
}
};

exports.prevSearchPage = async (req, res, next) => {
    if (req.session.u_id) {
    req.session.page = req.session.page - 5;
    res.redirect(301, "/discussion/search/pager");
    } else {
        res.render('login', { });
    }
};

exports.addDiscussionReplySearch = async (req, res, next) => {
    if (req.session.u_id) {
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
    res.redirect(301, "/discussion/search/pager");
} else {
    res.render('login', { });
}

};

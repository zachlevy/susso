// https://developers.facebook.com/docs/reference/api/post/

// GET vars
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// hit me bro
$(document).ready(function(){
    if (getUrlVars()['list'] == 'covers') {
        var profiles = new Array (
            'SamTsuiMusic',
            'pentatonix',
            'boyceavenue',
            'megannicolemusic',
            'gootmusic',
            'PianoGuys',
            'TylerWardMusic',
            'Maddybailey',
            'KurtHugoSchneider',
            'MaxSchneiderOfficial',
            'lindseystirlingmusic'
        );
        
        if (getUrlVars()['amount'] == 'all') {
            profiles = profiles.concat([
                'christinagrimmie',
                'TiffanyAlvord',
                'ChrissyOfficial',
                'Cimorelliband',
                'peterhollensmusic',
                'coreygraymusic',
                'juliasheertunes',
                'jasonchenmusic',
                'jayessleemusic',
                'HelloAlexG',
                'josephvincentmusic',
                'ahmirmusic',
                'jakecocomusic',
                'bethofficial',
                'thetannerpatrick'
            ]);
        }   
    } else if (getUrlVars()['list'] == 'fashion') {
        var profiles = [
            'vogue',
            'womensweardaily',
            'ellemagazine',
            'style',
            'FashionistaOfficial',
            'victoriabeckham',
            'rachelzoe',
            'InStyle',
            'BritishVogue',
            'wmagazine',
            'Cut',
            'WhoWhatWear',
            'VogueParis',
            'HarpersBazaar',
            'netaporter',
            'nylonmagazine',
            'Cosmopolitan',
            'hm'
        ];
    } else if (getUrlVars()['list'] == 'blogosphere') {
        var profiles = [
            'Upworthy',
            'mashable',
            'techcrunch',
            'reddit',
            'BuzzFeed‎',
            'Gawker‎',
            'HuffingtonPost',
            'thedailybeast',
            'lifehacker',
            'Engadget',
            'businessinsider',
            'TheAtlantic',
            'mashable.socialmedia',
            'mashable.tech',
            'mashable.business'
        ];
        if (getUrlVars()['amount'] == 'all') {
            profiles = profiles.concat([
                'mashable.usworld',
                'mashable.entertainment',
                'mashable.video',
                'mashable.lifestyle',
                'theoatmeal',
                'TheOnion',
                'gizmodo',
                'Cheezburger',
                'CollegeHumor‎'
            ]);
        }
    } else {

    }
    profileSearch(profiles);
});


function profileSearch (profiles) {
    //console.log('profiles: ' + profiles);
    for (i = 0; i < profiles.length; i++) {
        //var profile = profiles[i];
        searchProfile(profiles[i]);
        //console.log('profile: ' + profile);
        
    }
    //var profile = 'georgehtakei';
    //var profile = 'SamTsuiMusic';
    
}

function searchProfile (profile) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log('success' + profile + ': ' + xmlhttp.status);
            // do whatever with the response
            var cleanPosts = sortPosts(cleanFacebook(JSON.parse(xmlhttp.responseText)));
            //showFbResponse(cleanPosts);
            renderPosts(cleanPosts);
            /*
            // test
            for (i = 0; i < cleanPosts.length; i++) {
                fb_addToColumn(fbAddToCard(cleanPosts[i]));
            }
            */
            //showFbResponse(JSON.parse(xmlhttp.responseText).data[0].id);
        }
    }
    xmlhttp.open('GET', 'php/facebook.php?profile=' + profile, true);
    //console.log('open xmlhttp for: ' + profile);
    xmlhttp.send();
    //console.log('send xmlhttp' + profile);
}

// renders the posts on a page
function renderPosts (cleanPosts) {
    var pagePostsLimit = 2;
    if (cleanPosts.length < pagePostsLimit) {
        pagePostsLimit = cleanPosts.length;
    }
    //console.log('pagePostsLimit: ' + pagePostsLimit);
    for (var i = 0; i < pagePostsLimit; i++) {
        //console.log(cleanPosts[i]);
        fb_addToColumn(fbAddToCard(cleanPosts[i]));
    }
}

// check if there is a real lunch
/*
function getUrlLink (link) {
    var link = 'www.google.com';
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (link.match(regex)) {
        console.log('successfulurl');
    } else {
        console.log('no url')
    }
    return link;
}
*/
/*
// start me up
$(document).ready(function(){
    if (getUrlVars()['list'] == 'covers') {
        var usernames = new Array (
            ''
        );
        if (getUrlVars()['amount'] == 'all') {
            usernames = usernames.concat([
                ''
            ]);
        }
    } else if (getUrlVars()['list'] == 'fashion') {
        var usernames = new Array (
            ''
        );
    } else if (getUrlVars()['list'] == 'blogosphere') {
        var usernames = new Array (
            ''
        );
        if (getUrlVars()['amount'] == 'all') {
            usernames = usernames.concat([
                ''
            ]);
        }
    } else {

    }

    tweetLimit = 2;
    start = 0;
    while (start < tweetLimit) {

        for (i = 0; i < usernames.length; i++) {
            getTweets(usernames[i], start);
        }
        start++;
    }
});
*/

// generic output to the page
function showFbResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('fb-response').innerHTML += responseString;
}

// cleans the api response
function cleanFacebook(uncleanPosts) {
    //showFbResponse(uncleanPosts.data[0]);
    //console.log(title.responseText);
    var cleanPosts = new Array();
    for (var i = 0; i < uncleanPosts.data.length; i++) {
        if (uncleanPosts.data[i].type == 'photo' || uncleanPosts.data[i].type == 'link' || uncleanPosts.data[i].type == 'video') {
            //console.log(uncleanPosts.data[i].picture);
            var post = {};
            post['id'] = uncleanPosts.data[i].id;
            post['page'] = uncleanPosts.data[i].from.name;
            post['pageId'] = uncleanPosts.data[i].from.id
            post['text'] = uncleanPosts.data[i].message;
            post['link'] = uncleanPosts.data[i].link;
            post['linkName'] = uncleanPosts.data[i].name;
            post['linkCaption'] = uncleanPosts.data[i].caption;
            post['type'] = uncleanPosts.data[i].type;
            post['photo'] = parseFacebookPhoto(uncleanPosts.data[i].picture);
            /*
            if (post.type == 'photo') {
                post['photo'] = parseFacebookPhoto(uncleanPosts.data[i].picture);
            } else {
                post['photo'] = '';
            }
            */
            post['time'] = parseFacebookDate(uncleanPosts.data[i].created_time);
            post['likes'] = uncleanPosts.data[i].likes.summary.total_count;
            if (typeof(uncleanPosts.data[i].shares) != 'undefined') {
                post['shares'] = uncleanPosts.data[i].shares.count; // uncomment this
            } else {
                post['shares'] = '0';
                //console.log(uncleanPosts.data[i]);
            }
            //console.log(post.link);
            cleanPosts.push(post);
        }
    }
    //getUrlLink('asdf');
    //showFbResponse(cleanPosts[0]);
    return cleanPosts;
}

// add to the cards html
function fbAddToCard (post) {
    //console.log(post.id);
    if (post.type == 'photo') {
        var card = '<div class="card card-fb"><div class="profile"><div class="media-type pull-right">' 
        + '<i class="fa fa-facebook"></i></div>' 
        + '<div class="img-wrap"><img class= "img-circle" src="https://graph.facebook.com/' 
        + post.pageId + '/picture"></div>' 
        + '<div class="user-wrap"><h2 class="page">' 
        + post.page + '</h2></div></div><div id="fb-' 
        + post.id + '" class="photo"><img src="' 
        + post.photo + '" /></div><div class="text"><h2 class="message">' 
        + post.text + '</h2><ul class="stats"><li class="likes"><i class="fa fa-thumbs-up"></i></span><span class="count">' 
        + post.likes + '</span></li><li class="shares"><span class="glyphicon glyphicon-share"></span><span class="count">' 
        + post.shares + '</span></li><li class="time pull-right"><span class="glyphicon glyphicon-time"></span><span class="ago">' 
        + post.time + '</span></li></ul></div></div>';

    } else if (post.type == 'link') {

        var card = '<div class="card card-fb"><div class="profile"><div class="media-type pull-right">' 
        + '<i class="fa fa-facebook"></i></div>' 
        + '<div class="img-wrap"><img class= "img-circle" src="https://graph.facebook.com/' 
        + post.pageId + '/picture"></div>' 
        + '<div class="user-wrap"><h2 class="page">' 
        + post.page + '</h2></div></div><a id="fb-' 
        + post.id + '" class="link clearfix" href="' 
        + post.link + '" target="_blank"><img src="' 
        + post.photo + '" /><h2 class="title">' 
        + post.linkName + '</h2><span class="url">' + post.linkCaption + '</span></a><div class="text"><h2 class="message">' 
        + post.text + '</h2><ul class="stats"><li class="likes"><i class="fa fa-thumbs-up"></i></span><span class="count">' 
        + post.likes + '</span></li><li class="shares"><span class="glyphicon glyphicon-share"></span><span class="count">' 
        + post.shares + '</span></li><li class="time pull-right"><span class="glyphicon glyphicon-time"></span><span class="ago">' 
        + post.time + '</span></li></ul></div></div>';
    }else {
        //var card = '<div class="">Facebook type of ' + post.type + '</div>';
        //showFbResponse(post);
        //console.log(post.photo);
    }
    return card;
}

function fb_addToColumn (card) {
    column = Math.floor((Math.random()*3)+1);
    //console.log(card);
    //console.log(column);
    //card = 'successful card';
    document.getElementById('column'+column).innerHTML += card;
}

function parseFacebookPhoto (photo) {
    if (typeof(photo) != 'undefined') {
        photo = photo.replace('_s.png', '_n.png');
        photo = photo.replace('_s.jpg', '_n.jpg');
    }
    return photo;
}

function parseFacebookDate (uncleanDate) {
    var cleanDate = new Date(Date.parse(uncleanDate));
    //cleanDate.toString(); // => Wed Jan 11 2012 15:49:59 GMT-0500 (EST)
    //cleanDate.getTime(); // => 1326314999415
    //console.log(cleanDate.getTime());

    var user_date = new Date();
    var diff = Math.floor((user_date - cleanDate.getTime()) / 1000);
    if (diff <= 1) {return "just now";}
    if (diff < 20) {return diff + " seconds ago";}
    if (diff < 40) {return "half a minute ago";}
    if (diff < 60) {return "less than a minute ago";}
    if (diff <= 90) {return "one minute ago";}
    if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
    if (diff <= 5400) {return "1 hour ago";}
    if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
    if (diff <= 129600) {return "1 day ago";}
    if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
    if (diff <= 777600) {return "1 week ago";}
    if (diff <= 777600*2) {return "2 weeks ago";}
    if (diff <= 777600*3) {return "3 weeks ago";}
    if (diff <= 777600*4) {return "1 month ago";}
    return "over a month ago";
}



/*
function fbLinks (tweet) {
    //console.log(tweet['mentions'])
    if (typeof tweet['mentions'] !== 'undefined' && tweet['mentions'].length > 0) {
    //if (tweet['mentions'].length == null) {
        for (var i = 0; i < tweet['mentions'].length; i++) {
            //console.log(tweet['mentions']);
            //console.log(tweet['mentions'][i]['screen_name']);
            //console.log(tweet['text']);
            
            tweet['text'] = tweet['text'].replace('@'
                + tweet['mentions'][i]['screen_name'], 
                '<a href="http://twitter.com/'
                + tweet['mentions'][i]['screen_name']
                + '" target="_blank">@'
                + tweet['mentions'][i]['screen_name']
                + '</a>');
            
            //console.log(tweet['text']);
        }

    }
    if (typeof tweet['links'] !== 'undefined' && tweet['links'].length > 0) {
        for (var i = 0; i < tweet['links'].length; i++) {
            tweet['text'] = tweet['text'].replace(
                tweet['links'][i]['url'], 
                '<a href="' + tweet['links'][i]['url'] + '" target="_blank">' + tweet['links'][i]['display_url'] + '</a>'
                );
        }
    }
    return tweet;
}
*/

// sorts the cleaned posts
function sortPosts(posts) {
    posts.sort(function(a, b){
        return (b.likes + b.shares)-(a.likes + a.shares);
    })
    //showTweets(tweets);
    return posts;
}

/*
// renders the tweets on a page
function renderPosts (cleanTweets, start){
    if (start < cleanTweets.length) {
        tw_addToColumn(tw_addToCard(cleanTweets[start]));
        //console.log(cleanTweets[start].username);
    }
}

// takes in a clean array and outputs html
function fb_addToCard (tweet) {
    //console.log(tweet.username);
    var card = '<div class="card card-tw card-tw-text"><div class="profile"><div class="img-wrap"><img class= "img-circle" src="' 
    + tweet.userimg + '"></div><div class="user-wrap"><h2 class="name">' 
    + tweet.username + '</h2><h3 class="handle">@' 
    + tweet.screenname + '</h3></div></div><div class="tweet-wrap"><span class="tweet center-block">' 
    + tweet.text + '</span></div><div class="text"><ul class="stats"><li class="retweets"><span class="glyphicon glyphicon-retweet"></span><span class="count">' 
    + tweet.retweets + '</span></li><li class="favs"><span class="glyphicon glyphicon-star"></span><span class="count">' 
    + tweet.favs + '</span></li><li class="time pull-right"><span class="glyphicon glyphicon-time"></span><span class="ago">' 
    + tweet.time + '</span></li></ul></div></div>';
    return card;
}

// takes in html and puts it into a random column
function fb_addToColumn (card) {
    column = Math.floor((Math.random()*3)+1);
    document.getElementById('column'+column).innerHTML += card;
}


// outputs tweets on the page
function showPosts (tweets) {
    var outputTweets = JSON.stringify(tweets, '', 2);
    document.getElementById('tw-response').innerHTML += outputTweets;
}

// get the tweets from a given user
function getPosts (username, start) {
    renderTweets(sortTweets(cleanTweets(reply)), start);
};
*/
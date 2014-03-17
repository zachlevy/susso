// codebird for twitter
// secret token is public
// http://peerreach.com/lists/overview

// start me up
$(document).ready(function(){
    if (getUrlVars()['list'] == 'covers') {
        var usernames = new Array (
            'kurthschneider',
            'samueltsui',
            'ptxofficial',
            'boyceavenue',
            'megannicole',
            'alexgoot',
            'pianoguys',
            'Maxgschneider',
            'TylerWardMusic',
            'madilynbailey',
            'LindseyStirling',
            'peterhollens'
        );
        if (getUrlVars()['amount'] == 'all') {
            usernames = usernames.concat([
                'coreygray1',
                'j_sheer',
                'jasondchen',
                'jayessleemusic',
                'AlexGMusic7',
                'chestersee',
                'josephvincent12',
                'ahmir',
                'jakecoco',
                'beth_official',
                'tannerpatrick',
                'TiffanyAlvord',
                'ChrissyCostanza',
                'cimorelliband'
            ]);
        }
    } else if (getUrlVars()['list'] == 'fashion') {
        var usernames = new Array (
            'voguemagazine',
            'womensweardaily',
            'ELLEmagazine',
            'styledotcom',
            'Fashionista_com',
            'victoriabeckham',
            'RachelZoe',
            'InStyle',
            'BritishVogue',
            'wmag',
            'TheCut',
            'WhoWhatWear',
            'VogueParis',
            'harpersbazaarus',
            'NETAPORTER',
            'NylonMag',
            'Cosmopolitan',
            'hm'
        );
    } else if (getUrlVars()['list'] == 'blogosphere') {
        var usernames = new Array (
            'BuzzFeed',
            'Upworthy',
            'mashable',
            'HuffingtonPost',
            'reddit',
            'techcrunch',
            'businessinsider',
            'theatlantic',
            'Gawker',
            'lifehacker',
            'engadget',
            'mashsocialmedia',
            'mashabletech',
            'mashbusiness',
            'thedailybeast'
        );
        if (getUrlVars()['amount'] == 'all') {
            usernames = usernames.concat([
                'mashusworld',
                'mashentertain',
                'mashablevideo',
                'mashlifestyle',
                'BuzzFeedNews',
                'BuzzFeedEnt‎',
                'BuzzFeedUK‎',
                'oatmeal',
                'TheOnion',
                'HackerNewsOnion',
                'Gizmodo',
                'HuffPostUK',
                'Cheezburger',
                'CollegeHumor‎'
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

// generic output to the page
function showTwitterResponse(response) {

    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('tw-response').innerHTML += responseString;
}

// cleans the api response
function cleanTweets(uncleanTweets) {
    var cleanTweets = new Array();
    //console.log(uncleanTweets);
    //showTweets(uncleanTweets);
    for (var i = 0; i < uncleanTweets.length; i++) {
        var tweet = {};
        tweet['id'] = uncleanTweets[i]['id'];
        tweet['text'] = uncleanTweets[i]['text'];
        tweet['username'] = uncleanTweets[i]['user']['name'];
        tweet['screenname'] = uncleanTweets[i]['user']['screen_name'];
        tweet['userimg'] = uncleanTweets[i]['user']['profile_image_url'];
        tweet['time'] = parseTwitterDate(uncleanTweets[i]['created_at']);
        tweet['retweets'] = uncleanTweets[i]['retweet_count'];
        tweet['favs'] = uncleanTweets[i]['favorite_count'];
        tweet['links'] = uncleanTweets[i]['entities']['urls'];
        tweet['mentions'] = uncleanTweets[i]['entities']['user_mentions'];
        tweet = tweetLinks(tweet);
        cleanTweets.push(tweet);
    }
    //showTweets(cleanTweets);
    return cleanTweets;
}

function parseTwitterDate(tdate) {
    var system_date = new Date(Date.parse(tdate));
    var user_date = new Date();
    if (K.ie) {
        system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
    }
    var diff = Math.floor((user_date - system_date) / 1000);
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
    return "over a week ago";
}

function tweetLinks (tweet) {
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

// from http://widgets.twimg.com/j/1/widget.js
var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    }
}();

// sorts the cleaned tweets
function sortTweets(tweets) {
    tweets.sort(function(a, b){
        return (b.favs + b.retweets)-(a.favs + a.retweets);
    })
    //showTweets(tweets);
    return tweets;
}

// renders the tweets on a page
function renderTweets (cleanTweets, start){
    if (start < cleanTweets.length) {
        tw_addToColumn(tw_addToCard(cleanTweets[start]));
        //console.log(cleanTweets[start].username);
    }
}

// takes in a clean array and outputs html
function tw_addToCard (tweet) {
    //console.log(tweet.username);
    var card = '<div class="card card-tw card-tw-text"><div class="profile"><div class="media-type pull-right">' 
        + '<i class="fa fa-twitter"></i></div><div class="img-wrap"><img class= "img-circle" src="' 
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
function tw_addToColumn (card) {
    column = Math.floor((Math.random()*3)+1);
    document.getElementById('column'+column).innerHTML += card;
}


// outputs tweets on the page
function showTweets (tweets) {
    var outputTweets = JSON.stringify(tweets, '', 2);
    document.getElementById('tw-response').innerHTML += outputTweets;
}

// get the tweets from a given user
function getTweets (username, start) {
    var cb = new Codebird;
    cb.setConsumerKey("API_KEY", "API_SECRET"); // replace with your own
    cb.setToken("ACCESS_TOKEN", "ACCESS_TOKEN_SECRET");
    cb.__call(
        "statuses_userTimeline",
        {
            screen_name: username,
            count: 10,
            //exclude_replies: true,
            //contributor_details: true
        },
        function (reply) {
            renderTweets(sortTweets(cleanTweets(reply)), start);
        }
    );
};
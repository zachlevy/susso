// GET vars
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function onVideoClick (videoId) {
    var playerHtml = '<iframe class="player" src="//www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&loop=0&theme=light&color=white&iv_load_policy=3" frameborder="0" allowfullscreen=""></iframe>';
    document.getElementById('yt-' + videoId).innerHTML = playerHtml;
}

//susso api key
//AIzaSyDGVGXXtr8g-z6pirjLe98-gDF5PavMHrg

// get the channel id from browser
//https://www.googleapis.com/youtube/v3/channels?key=AIzaSyDGVGXXtr8g-z6pirjLe98-gDF5PavMHrg&forUsername= USERNAME &part=id

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {

    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('yt-response').innerHTML += responseString;
}

// cleans the api responses for stats and video snippet
function cleanVideos (uncleanStats, uncleanVideos) {
    //console.log(uncleanVideos);
    var cleanVideos = new Array();
    for (var i = 0; i < uncleanVideos['items'].length; i++) {
        var video = {};
        // snippet
        video['id'] = uncleanVideos['items'][i].id.videoId;
        video['title'] = uncleanVideos['items'][i].snippet.title;
        video['img'] = uncleanVideos['items'][i].snippet.thumbnails.medium.url;
        video['desc'] = uncleanVideos['items'][i].snippet.description;
        video['time'] = parseYoutubeDate(uncleanVideos['items'][i].snippet.publishedAt); // published
        video['channelId'] = uncleanVideos['items'][i].snippet.channelId;
        video['channel'] = uncleanVideos['items'][i].snippet.channelTitle;
        
        // stats
        video['statsId'] = uncleanStats['items'][i].id;
        video['likes'] = uncleanStats['items'][i].statistics.likeCount;
        video['dislikes'] = uncleanStats['items'][i].statistics.dislikeCount;
        video['views'] = uncleanStats['items'][i].statistics.viewCount;
        video['favs'] = uncleanStats['items'][i].statistics.favoriteCount;
        cleanVideos.push(video);

        //console.log( video['likes'] / (video['likes'] + video['dislikes'] ));
    }
    sortVideos(cleanVideos);
    //showVideos(cleanVideos);
    renderVideos(cleanVideos);
    return cleanVideos;
}

function parseYoutubeDate (uncleanDate) {
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

// renders the videons on a page
function renderVideos (cleanVideos){
    var channelVideoLimit = 1;
    if (cleanVideos.length < channelVideoLimit) {
        channelVideoLimit = cleanVideos.length;
    }
    for (var i = 0; i < channelVideoLimit; i++) {
        addToColumn(addToCard(cleanVideos[i]));
    }
}

// takes in a clean array and outputs html
function addToCard (video) {
    //console.log(video.channel);
    var card = '<div class="card card-yt"><div class="profile"><div class="media-type pull-right"><span onclick="onVideoClick(\'' 
    + video.id + '\')" class="glyphicon glyphicon-play-circle"></span></div><div class="img-wrap"><img class= "img-circle" src="http://placehold.it/48x48"></div><div class="user-wrap"><h2 class="channel">' 
    + video.channel + '</h2></div></div><div id="yt-' 
    + video.id + '" onclick="onVideoClick(\'' 
    + video.id + '\')" class="video"><img src="' 
    + video.img + '" /></div><div class="text"><h2 class="title">' 
    + video.title + '</h2><ul class="stats"><li class="views"><span class="glyphicon glyphicon-eye-open"></span><span class="count">' 
    + video.views + '</span></li><li class="likes"><span class="glyphicon glyphicon-heart"></span><span class="count">' 
    + video.likes + '</span></li><li class="time pull-right"><span class="glyphicon glyphicon-time"></span><span class="ago">' 
    + video.time + '</span></li></ul></div></div>';
    return card;
}

// takes in a clean array and outputs html
/*
function addToCard (video) {
    //console.log(video.channel);
    var card = '<div class="card card-yt"><div class="profile"><div class="img-wrap"><img class= "img-circle" src="http://placehold.it/48x48"></div><div class="user-wrap"><h2 class="channel">' 
    + video.channel + '</h2></div></div><div id="yt-' + video.id + '" class="video"><iframe class="player" src="//www.youtube.com/embed/' 
    + video.id + '" frameborder="0" allowfullscreen></iframe></div><div class="text"><h2 class="title">' 
    + video.title + '</h2><ul class="stats"><li class="views"><span class="glyphicon glyphicon-eye-open"></span><span class="count">' 
    + video.views + '</span></li><li class="likes"><span class="glyphicon glyphicon-heart"></span><span class="count">' 
    + video.likes + '</span></li><li class="time pull-right"><span class="glyphicon glyphicon-time"></span><span class="ago">' 
    + video.time + '</span></li></ul></div></div>';
    return card;
}
*/

// takes in html and puts it into a random column
function addToColumn (card) {
    column = Math.floor((Math.random()*3)+1);
    document.getElementById('column'+column).innerHTML += card;
}

// sorts the cleaned videos by like %
function sortVideos (videos) {
    videos.sort(function(a, b){
        return (b.likes / (b.likes + b.dislikes)) - (a.likes / (a.likes + a.dislikes));
    })
    //showVideos(videos);
    return videos;
}

// dispalys the video on the page
function showVideos (videos) {
    var responseString = JSON.stringify(videos, '', 2);
    document.getElementById('yt-response').innerHTML += responseString;
}


// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyDGVGXXtr8g-z6pirjLe98-gDF5PavMHrg');

    channelSearch();
}

// initial function to search all the channels
function channelSearch() {
    if (getUrlVars()['list'] == 'covers') {
        var channels = [
            'UCplkk3J5wrEl0TNrthHjq4Q', //KurtHugoSchneider
            'UCWrtsravWX0ANhHiJXNlyXw', //TheSamTsui
            'UCmv1CLT6ZcFdTJMHxaR9XeA', //PTXofficial
            'UCgc00bfF_PvO_2AvqJZHXFg', //boyceavenue
            'UChWmYNTHQpLmJdkScwNrgcA', //megannicolesite
            'UCLRpI5yd10aJxSel3e6MlNw', //gootmusic
            'UCmKurapML4BF9Bjtj4RbvXw', //ThePianoGuys
            'UCQIRM93QxhQ4pGm0cxuCXDw', //MaxSchneider1
            'UC4vT3qTr8fwVS7IsPgqaGCQ', //TylerWardMusic
            'UCZH4EVUqljV-zkZEd0Ot7EQ', //MadilynBailey
            'UCyC_4jvPzLiSkJkLIkA7B8g', //lindseystomp
            'UCgITW_70LNZFkNna7VsXbuQ' //peterhollens
        ];
        if (getUrlVars()['amount'] == 'all') {
            channels = channels.concat([
                'UC9trcENZCwj4ZKIH1lm-WuQ', //Kurt
                'UCUudDyi0JiVmSxarvU98YYQ', //zeldaxlove64
                'UCxCSUWkrFwSnYxCOWO-dXtw', //officialcoreygray
                'UCoZz9G7PyY9siwzOH8jFadg', //JuliaSheer
                'UC7OlHCKh1QLUGpVfRQwKA-g', //miniachilles
                'UCdAFRh3rxx0Q_xxkS2_N2PA', //Jayesslee
                'UCrY87RDPNIpXYnmNkjKoCSw', //AlexGMusic7
                'UCQIP6tGA4AQEIkABgb1AlhQ', //chestersee
                'UCyJEAZW-4U9wK30v-OqG59g', //hoorahjencar
                'UCznVM0EC0LnGxBZLwTqRIhg', //ahmirTV
                'UCaaLeJT7Q6bh1XaHWzmRDCw', //jakecoco
                'UCfYReF1e8lI85qH8FndkqBw', //BethOfficial
                'UCwXrgBTQivCdSRBck6-oRYQ', //TannerPatrick
                'UCR-ENZ64WL1vB8KU4YzdmTQ', //TiffanyAlvord
                'UCj-ZvTVcl9mphVZiRlcNS-Q', //chrissycostanza
                'UCVPbYft7bolH_jOEZ3Ec51A' //cimorellitheband
            ]);    
        }
    } else if (getUrlVars()['list'] == 'fashion') {
        var channels = [
            'UCRXiA3h1no_PFkb1JCP0yMA', //Americanvogue
            'UCZyQcFvEE8VWNheDYyAHUzg', //wwd
            'UCV8Do0nwSrYP7lwPBS4LWpw', //ElleMagazine
            'UCk1IXTn78FtPm8p6ytbvwog', //style
            'UC1QXhnP2qTw3ZbZ8Zikgz9w'/*, //victoriabeckham
            'UCj6iVt0NLGyj406r2kD161g', //instyle
            'UCZ8TREbPfawhSvayVe5pqKg', //vogue
            'UCB_TGajnJymiSmu6zWkjW2Q', //wmagazinedotcom
            'UClct1lanlIBzT7JUo2UQnjw', //WhoWhatWear
            'UCli6Q1pd3DitknGEuMKnAVA', //Vogueparisfr
            'UCzsF1ghKHeif7AmTNlRYAzQ', //harpersbazaar
            'UCZprVLJfXNuCO50MAnXL_CQ', //netaporter
            'UCsXb1jdMa3ybPw4eiT_2g-A', //NylonMagazineTV
            'UCjZASCo852vWcsN8xRAOEWA', //cosmopolitan
            'UCoc8tpGCY1wrp8pV7mI0scA' //hennesandmauritz
            */
        ];
        if (getUrlVars()['amount'] == 'all') {
            channels = channels.concat([
                ''
            ]);
        }
    } else if (getUrlVars()['list'] == 'blogosphere') {
        var channels = new Array (
            'UCswDowOOvJ-fkCgH9YAITjQ', //upworthy 
            'UCL8Nxsa1LB9DrMTHtt3IKiw', //Mashable 
            'UCpko_-a4wgz2u_DgDgd9fqA', //BuzzFeedVideo 
            'UCK0z0_5uL7mb9IjntOKi5XQ', //TheAtlantic 
            'UCcyq283he07B7_KUX07mmtA', //Business Insider 
            'UCCjyq_K1Xwfg8Lndy7lKMpA', //TechCrunch 
            'UC-6OW5aJYBFM33zXQlBKPNA', //Engadget 
            'UCYGnmkFGP4EgAOqu58JA_lg', //Lifehacker 
            'UCUgrUBKwSnXwQOBG4v3igMg', //reddit 
            'UCay_OLhWtf9iklq8zg_or0g' //BuzzFeedYellow 
        );
    } else {

    }
    
    // comment out for get channel ids
    for (i = 0; i < channels.length; i++) {
        search(channels[i]);
    }
    
    // get channel ids
    /*
    console.log('temp');
    for (i = 0; i < channels.length; i++) {
        var request = gapi.client.youtube.channels.list({
            part: 'snippet',
            forUsername: channels[i],
            maxResults: 5
        });
        //console.log(channels[i]);
        //https://www.googleapis.com/youtube/v3/channels?key=AIzaSyDGVGXXtr8g-z6pirjLe98-gDF5PavMHrg&forUsername= USERNAME &part=id
        request.execute(onChannelId);
    }
    */
}

// get channel ids
function onChannelId (response) {
    console.log(response.items[0].snippet.title);
    console.log(response.items[0].id);
    //console.log(response);
}


// searches a specific channel
function search(channel) {
    // less than a month ago
    var today = new Date()
    var postAfter = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay() + 'T00:00:00Z';
    // Use the JavaScript client library to create a search.list() API call.
    // get all the videos from the channel id
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        order: 'date',
        type: 'video',
        publishedAfter: postAfter,
        brandingSettings: true,
        videoEmbeddable: true,
        channelId: channel,
        maxResults: 5
    });
    
    /*
    var requestChannel = gapi.client.youtube.channels.list ({
        part: 'brandingSettings',
        id: channel
    })
    */

    //requestChannel.execute(showVideos);

    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// gets all the likes and returns the videos and the likes in separate objects
// takes a csv list of video ids
function getLikes (videoIds, videos) {
    var request = gapi.client.youtube.videos.list({
        part: 'statistics',
        id: videoIds
    });
    
    request.execute(function(response) {
        var stats = response.result;
        onStatsResponse(stats, videos);
    });
}

// callback after getting likes
function onStatsResponse(stats, videos) {
    cleanVideos(stats, videos);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    // showVideos(response);
    var videoIds = "";
    for (var i = 0; i < response['items'].length; i++) {
        videoIds = videoIds.concat(response['items'][i]['id']['videoId'], ",");
    }

    getLikes(videoIds, response);
}
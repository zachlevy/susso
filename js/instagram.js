var igClientId = '71e25c03f283472ca061a018f41bbc41';

// lets get ready to rumble
$(document).ready(function(){
    if (ig_getUrlVars()['list'] == 'covers') {
        var profiles = new Array (
            '175078815', //thesamtsui
            '209155614', //ptxofficial
            '10457317', //megannicolemusic
            '55881202', //alexgoot
            '223173528', //KurtSchneider
            '10579438', //tannerpatrick
            '5823675', //maxgschneider
            '16389593', //TylerWardMusic
            '27197694', //madilynbailey
            '186622962' //lindseystirling
        );
        
        if (ig_getUrlVars()['amount'] == 'all') {
            profiles = profiles.concat([
                '13784065', //coreyg1
                '8483347', //juliasheer
                '32527641', //jasondchen
                '31607087', //alexgmusic7
                '13737265', //chesterseesphotos
                '13224437', //josephvincent
                '145471890', //ahmirmusic
                '6201290', //jakecoco
                '18772797' //bethpictures
            ]);
        }   
    } else if (ig_getUrlVars()['list'] == 'fashion') {
        var profiles = [
            '198154074',  //voguemagazine
            '178598981', //elleusa
            '22619435', //styledotcom
            '16929279', //fashionista_com
            '186901415', //victoriabeckham
            '21584428', //rachelzoe
            '18464866', //instylemagazine
            '208475967', //british_vogue
            '146182543', //wmagazine
            '25792287', //cutblog
            '27879728', //whowhatwear
            '226876906', //vogueparis
            '198539316', //harpersbazaarus
            '5248998', //netaporter
            '3119358', //nylonmag
            '42725516', //cosmopolitan
            '23410080' //hm
        ];
    } else if (ig_getUrlVars()['list'] == 'blogosphere') {
        var profiles = [
            '27749660', //upworthy x 
            '1323391', //mashable x
            '10722084', //reddit x
            '198218772', //techcrunch x 
            '21943587', //huffingtonpost x
            '445379440', //lifehacker‎ x
            '520771652' //engadget x
        ];
        if (ig_getUrlVars()['amount'] == 'all') {
            profiles = profiles.concat([
                '196967498' //collegehumor
            ]);
        }
    } else {

    }
    for (i = 0; i < profiles.length; i++) {
        searchUser(profiles[i]);
    }
});

// display json on the page
function showInstagramResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('ig-response').innerHTML += responseString;
}

// hit instagram for the photos
function searchUser (userId) {
  var url = 'https://api.instagram.com/v1/users/' + userId + '/media/recent/?client_id=' + igClientId + '&count=6&callback=?';

  $.getJSON(url, function (data) {
    renderGrams(sortGrams(cleanGrams(data)));
    //console.log(data);
  });
}

// renders the gams
function renderGrams (cleanGrams) {
    
    var gramsLimit = 2;
    if (cleanGrams.length < gramsLimit) {
        gramsLimit = cleanGrams.length;
    }
    for (i = 0; i < gramsLimit; i++) {
        igAddToColumn(igAddToCard(cleanGrams[i]));
    }
}

// take in a gram and add it to a card
function igAddToCard (gram) {
    var card = '<div class="card card-ig"><div class="profile"><div class="media-type pull-right">' 
        + '<i class="fa fa-instagram"></i></div>' 
        + '<div class="img-wrap"><img class= "img-circle" src="' 
        + gram.userPhoto + '"></div>' 
        + '<div class="user-wrap"><h2 class="user">' 
        + gram.userName + '</h2><h3 class="handle">@' 
        + gram.user + '</h3></div></div><div id="ig-' 
        + gram.id + '" class="photo"><img src="' 
        + gram.photo + '" /></div><div class="text"><h2 class="message">' 
        + gram.text + '</h2><ul class="stats"><li class="likes"><i class="fa fa-heart"></i></span><span class="count">' 
        + gram.likes + '</span></li><li class="time pull-right"><span class="glyphicon glyphicon-time"></span><span class="ago">' 
        + gram.time + '</span></li></ul></div></div>';
    return card;
}

function igAddToColumn (card) {
    column = Math.floor((Math.random()*3)+1);
    document.getElementById('column'+column).innerHTML += card;
}

// clean response
function cleanGrams (uncleanGrams) {
    var cleanGrams = new Array();
    for (var i = 0; i < uncleanGrams.data.length; i++) {
        
        if (uncleanGrams.data[i].type == 'image') {
            var gram = {};
            gram['id'] = uncleanGrams.data[i].id;
            gram['type'] = uncleanGrams.data[i].type; 
            if (typeof(uncleanGrams.data[i].caption) != 'undefined' && uncleanGrams.data[i].caption != null) {
                gram['text'] = uncleanGrams.data[i].caption.text;
            } else {
                gram['text'] = '';
            }
            
            gram['photo'] = uncleanGrams.data[i].images.standard_resolution.url;
            gram['source'] = uncleanGrams.data[i].link;
            
            gram['likes'] = uncleanGrams.data[i].likes.count;
            gram['time'] = parseInstagramDate(uncleanGrams.data[i].created_time);

            gram['userId'] = uncleanGrams.data[i].user.id;            
            gram['user'] = uncleanGrams.data[i].user.username;
            gram['userPhoto'] = uncleanGrams.data[i].user.profile_picture;
            gram['userName'] = uncleanGrams.data[i].user.full_name;
            
            cleanGrams.push(gram);
        }
        
    }
    return cleanGrams;
}

// sorts the cleaned grams
function sortGrams(grams) {
    grams.sort(function(a, b){
        return b.likes - a.likes;
    })
    return grams;
}

// change the date into a sexy format
function parseInstagramDate (uncleanDate) {
    var system_date = new Date(uncleanDate*1000);
    var user_date = new Date();
    //console.log('uncleanDate: ' + system_date);
    //console.log('currentDate: ' + user_date);

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
    //return cleanDate;
}

// GET vars
function ig_getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}



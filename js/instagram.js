//https://github.com/potomak/jquery-instagram

// client id
// 71e25c03f283472ca061a018f41bbc41
// client secret
// 03ace9a2b9d541a4a7a0edd439185dc1

// DOESNT WORK


function showInstagramResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('ig-response').innerHTML += responseString;
}

jQuery(function($) {

  $('.instagram').on('willLoadInstagram', function(event, options) {
    console.log(options);
  });

  $('.instagram').on('didLoadInstagram', function(event, response) {
    //console.log(response);
    showInstagramResponse(response);
  });

  $('.instagram').instagram({
    hash: 'tech',
    //userId: 'zachary_levy',
    clientId: '71e25c03f283472ca061a018f41bbc41',
    count: 5
  });

});

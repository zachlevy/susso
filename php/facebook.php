<?php

function fetchUrl($url){

 $ch = curl_init();
 curl_setopt($ch, CURLOPT_URL, $url);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 curl_setopt($ch, CURLOPT_TIMEOUT, 20);
 // You may need to add the line below
 // curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);

 $feedData = curl_exec($ch);
 curl_close($ch); 

 return $feedData;

}

$profile_id = $_GET['profile'];
//$profile_id = "zacharyaaronlevy";

//App Info, needed for Auth
$app_id = "1401787890061401";
$app_secret = "4455966b1f04e3365ce24df9ba8629fb";

//Retrieve auth token
$authToken = fetchUrl("https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id={$app_id}&client_secret={$app_secret}");

$json_object = fetchUrl("https://graph.facebook.com/{$profile_id}/posts?limit=6&fields=id,from,picture,link,name,caption,message,message_tags,type,story_tags,object_id,created_time,shares,likes.limit(1).summary(true)&{$authToken}");

echo $json_object;

?>
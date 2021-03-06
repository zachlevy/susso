<?php //header('Access-Control-Allow-Origin: *'); ?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="">

    <title>SUSSO | Sustainable Social Media</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/susso.css" rel="stylesheet">

    <!-- font-awesome icons -->
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

    <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="js/youtube.js"></script>
    <script type="text/javascript" src="js/instagram.js"></script>
    <script type="text/javascript" src="js/sha1.js"></script>
    <script type="text/javascript" src="js/codebird.js"></script>
    <script type="text/javascript" src="js/twitter.js"></script>
    <script type="text/javascript" src="js/facebook.js"></script>
 




    <script src="https://apis.google.com/js/client.js?onload=onClientLoad" type="text/javascript"></script>
  </head>

  <body>

    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/?list=blogosphere">SUS<span class="dot">.</span>SO</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="/?list=blogosphere">Blogosphere</a></li>
            <li><a href="/?list=fashion">Fashion</a></li>
            <li><a href="/?list=covers">Music Covers</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div id="column1" class="col-lg-4">

            <!--
            <div class="card card-tw card-tw-text">
              <div class="profile">
                <div class="img-wrap">
                  <img class= "img-circle" src="http://placehold.it/48x48">
                </div>
                <div class="user-wrap">
                  <h2 class="name">Eric Ries</h2>
                  <h3 class="handle">@ericries</h3>
                </div>
              </div>
              <div class="tweet-wrap">
                <span class="tweet center-block">Want to learn about the biggest implementation of #LeanStartup on earth? <a href="http://ericri.es/1gfQ4fK">http://ericri.es/1gfQ4fK</a></span>
              </div>
              <div class="text">
                <ul class="stats">
                  <li class="retweets">
                    <span class="glyphicon glyphicon-retweet"></span>
                    <span class="count">12</span>
                  </li>
                  <li class="favs">
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="count">8</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="card card-yt">
              <div class="profile">
                <div class="img-wrap">
                  <img class= "img-circle" src="http://placehold.it/48x48">
                </div>
                <div class="user-wrap">
                  <h2 class="channel">Panatonix</h2>
                </div>
              </div>
              <div class="video">
                <iframe class="player" src="//www.youtube.com/embed/ZEa0T9QdYm4" frameborder="0" allowfullscreen></iframe>
              </div>
              <div class="text">
                <h2 class="title">PTX VOL. II - An Introduction</h2>
                <ul class="stats">
                  <li class="views">
                    <span class="glyphicon glyphicon-eye-open"></span>
                    <span class="count">512</span>
                  </li>
                  <li class="likes">
                    <span class="glyphicon glyphicon-heart"></span>
                    <span class="count">234</span>
                  </li>
                </ul>
              </div>
            </div>
            -->

          </div> <!-- end col 1 -->

          <div id="column2" class="col-lg-4">

            <!--
            <div class="card card-yt">
              <div class="profile">
                <div class="img-wrap">
                  <img class= "img-circle" src="http://placehold.it/48x48">
                </div>
                <div class="user-wrap">
                  <h2 class="channel">Panatonix</h2>
                </div>
              </div>
              <div class="video">
                <iframe class="player" src="//www.youtube.com/embed/ZEa0T9QdYm4" frameborder="0" allowfullscreen></iframe>
              </div>
              <div class="text">
                <h2 class="title">PTX VOL. II - An Introduction</h2>
                <ul class="stats">
                  <li class="views">
                    <span class="glyphicon glyphicon-eye-open"></span>
                    <span class="count">512</span>
                  </li>
                  <li class="likes">
                    <span class="glyphicon glyphicon-heart"></span>
                    <span class="count">234</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="card card-tw card-tw-text">
              <div class="profile">
                <div class="img-wrap">
                  <img class= "img-circle" src="http://placehold.it/48x48">
                </div>
                <div class="user-wrap">
                  <h2 class="name">Eric Ries</h2>
                  <h3 class="handle">@ericries</h3>
                </div>
              </div>
              <div class="tweet-wrap">
                <span class="tweet center-block">Want to learn about the biggest implementation of #LeanStartup on earth? <a href="http://ericri.es/1gfQ4fK">http://ericri.es/1gfQ4fK</a></span>
              </div>
              <div class="text">
                <ul class="stats">
                  <li class="retweets">
                    <span class="glyphicon glyphicon-retweet"></span>
                    <span class="count">12</span>
                  </li>
                  <li class="favs">
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="count">8</span>
                  </li>
                </ul>
              </div>
            </div>
            -->
          </div> <!-- end col 2 -->

          <div id="column3" class="col-lg-4"> <!-- start col 3 -->
            <!--
            <div class="card card-tw card-tw-img">
              <div class="profile">
                <div class="img-wrap">
                  <img class= "img-circle" src="http://placehold.it/48x48">
                </div>
                <div class="user-wrap">
                  <h2 class="name">Eric Ries</h2>
                  <h3 class="handle">@ericries</h3>
                </div>
              </div>
              <div class="tweet-wrap">
                <div class="card-img">
                  <img src="http://placehold.it/400x300">
                </div>
                <span class="tweet center-block">Want to learn about the biggest implementation of #LeanStartup on earth? <a href="http://ericri.es/1gfQ4fK">http://ericri.es/1gfQ4fK</a></span>
              </div>
              <div class="text">
                <ul class="stats">
                  <li class="retweets">
                    <span class="glyphicon glyphicon-retweet"></span>
                    <span class="count">12</span>
                  </li>
                  <li class="favs">
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="count">8</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="card card-yt">
              <div class="profile">
                <div class="img-wrap">
                  <img class= "img-circle" src="http://placehold.it/48x48">
                </div>
                <div class="user-wrap">
                  <h2 class="channel">Panatonix</h2>
                </div>
              </div>
              <div class="video">
                <iframe class="player" src="//www.youtube.com/embed/ZEa0T9QdYm4" frameborder="0" allowfullscreen></iframe>
              </div>
              <div class="text">
                <h2 class="title">PTX VOL. II - An Introduction</h2>
                <ul class="stats">
                  <li class="views">
                    <span class="glyphicon glyphicon-eye-open"></span>
                    <span class="count">512</span>
                  </li>
                  <li class="likes">
                    <span class="glyphicon glyphicon-heart"></span>
                    <span class="count">234</span>
                  </li>
                </ul>
              </div>
            </div>
            -->
          </div> <!-- end col 3 -->


        </div>
      </div>
      <!--
      <div class="row">
        <div class="col-lg-12">
          <button type="button" class="btn btn-info">Moar!</button>
        </div>
      </div>
      -->
      <!--
      <div class="row">
        <div class="col-lg-12">
          <h1>YouTube Results</h1>
          <pre id="yt-response">
          </pre>
          <h1>Twitter Results</h1>
          <pre id="tw-response">
          </pre>
          <h1>Instagram Results</h1>
          <pre id="ig-response">
          </pre>
          <h1>Facebook Results</h1>
          <pre id="fb-response">
            <?php //echo $json_object; ?>
          </pre>
          
        </div>
      </div>
      -->
      
    </div><!-- /.container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>

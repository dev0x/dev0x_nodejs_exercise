
var express = require("express");
var app = express();
var basicAuth = require("basic-auth"); //Req basic-auth module
var bodyParser = require("body-parser"); // Req body-parser module
var bookmark = require("./models/bookmark.js"); // Req Bookmark class
var promise = require('promise');

var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === 'mracine' && user.pass === 'c0mpl3xPass') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var bookmarks = []; //empty array
/*var dummyBookmark = new bookmark({url:"dummyUrl",description:"dummyDescription"});
bookmarks.push(dummyBookmark);*/

//POST - insert a new Bookmark into bookmarks array
app.post("/bookmarks", auth, function(req,res){
  var url= req.body.url;
  var description= req.body.description;
  if(!url || !description){
    var newBookmark = new bookmark(url, description);
    bookmarks.push(newBookmark);

  }
        res.send(bookmarks);
});

//GET return all the bookmarks from the bookmarks array
app.get("/bookmarks", function(req, res){
    res.send(bookmarks);
});


app.listen(3030);
console.log("app running on localhost:3030");

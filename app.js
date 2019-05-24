var express = require("express");
var request = require("request");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    var movie = req.query.movie;
    var year  = req.query.year;
    var url   = "https://www.omdbapi.com/?s=" + movie + "&y=" + year + "&apikey=thewdb";
    request(url, function(error, response, body) {
       if(!error && response.statusCode == 200) {
         var result = JSON.parse(body);
         res.render("results", {result: result, movie: movie, year: year});
       } 
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Running movie app..."); 
});
const express = require("express");
const https = require("https");
const path = require("path");
const bodyParser = require('body-parser');


const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');


app.get("/",function(req, res){


  
  res.render("index");

});

app.listen(port, function(){
  console.log("Server runs on Port : " + port);
}); 

  
/*
  https.get(url, function(resOpenWeather){
    console.log(resOpenWeather.body);

    resOpenWeather.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });*/

  
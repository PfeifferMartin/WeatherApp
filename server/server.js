const express = require("express");
const https = require("https");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Salzburg&appid=d57d2c7994d3ddeb7681ec6ba847752e";

  https.get(url, function(resOpenWeather){
    console.log(resOpenWeather.body);

    resOpenWeather.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  var root = path.join(__dirname, '..', 'index.html');
  res.sendFile(root);
});

app.listen(port, function(){
  console.log("Server runs on Port : " + port);
});

const express = require("express");
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
const openWeatherApiKey = "d57d2c7994d3ddeb7681ec6ba847752e";


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");



app.get("/",function(req, res){


  var weatherForecast = getWeatherForNext5Days()

  res.render("index");
  
});

app.post("/",function(req,res){

  res.redirect("get","/");

});

app.listen(port, function(){
  console.log("Server runs on Port : " + port);
}); 

  

function getWeatherForNext5Days (cityName, ){

  if(cityName != null && openWeatherApiKey != null)
    var openWeatherUrl = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + openWeatherApiKey;
  
    var weatherForecast;

  //get Data form OpenWeather.org
  https.get(url, function(resOpenWeather){
    console.log(resOpenWeather.body);

    resOpenWeather.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });


  return weatherForecast;

}

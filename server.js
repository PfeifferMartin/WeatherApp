const express = require("express");
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require('axios');

const port = 3000;
const app = express();
const openWeatherApiKey = "d57d2c7994d3ddeb7681ec6ba847752e";
var weatherForecastForNext5Days = null;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(port, function () {
  console.log("Server runs on Port : " + port);
});



/*-------------*/
/*Endpoints*/
app.get("/", function (req, res) {
  var showWeatherCards = false;
  var foreCast = weatherForecastForNext5Days;
  var icons = "";
  var dates = "";
  var temps = "";

  var widgetData = {
    date: "",
    temp: "",
    icon: ""
  };
  var widgetDataRows = [];
  var widgetDataEntries = [];

  if (foreCast != null && foreCast != "") {
    showWeatherCards = true;
    weatherForecastForNext5Days = null; // set null in case of refresh
    var dateEquals = "";
    for (let index = 0; index < foreCast.list.length; index++) {
      widgetData.date = foreCast.list[index].dt_txt.split(" ",1)[0];
      widgetData.temp = foreCast.list[index].main.temp;
      widgetData.icon = foreCast.list[index].weather[0].icon;

      if(dateEquals != widgetData.date){
        if(dateEquals != ""){
          widgetDataEntries.push(JSON.parse(JSON.stringify(widgetDataRows)));
          widgetDataRows = [];
        }else
          widgetDataRows.push(JSON.parse(JSON.stringify(widgetData)));

        dateEquals = widgetData.date;
      }else{
        widgetDataRows.push(JSON.parse(JSON.stringify(widgetData)));
      }
    }
  }

  res.render("index", 
  { showWeatherCards: showWeatherCards, 
    icon: icons, 
    widgetDataEntries: widgetDataEntries });
    
});

app.post("/", async function (req, res) {

  if (req.body.inputCityName != null && req.body.inputCityName != "") {
    weatherForecastForNext5Days = await getWeatherForNext5Days(req.body.inputCityName);
  }
  res.redirect("/");
});




/*-------------*/
/*Functions*/
async function getWeatherForNext5Days(cityName) {

  if (cityName != null && openWeatherApiKey != null)
    var openWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + openWeatherApiKey;

  var weatherForecast = "";

  //get Data form OpenWeather.org
  try {
    weatherForecast = await axios.get(openWeatherUrl);
  } catch (err) {
    console.error(err);
  }

  return weatherForecast.data;

}

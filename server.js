const express = require("express");
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");

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
  if (foreCast != null && foreCast != "") {
    showWeatherCards = true;
    weatherForecastForNext5Days = null; // set null in case of refresh
  }

  res.render("index", { showWeatherCards: showWeatherCards });
});

app.post("/", function (req, res) {

  if (req.body.inputCityName != null && req.body.inputCityName != "") {

  }else
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
    console.log(weatherForecast);
  } catch (err) {
    console.error(err);
  }

  return weatherForecast;

}

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res) {

  const query = req.body.cityName;
  const apiKey = "90d5c63c2057334f76d4c46988b7efb1";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {

      const weatherData = JSON.parse(data); //converting Byte data to JSON format

      const temp1 = weatherData.main.temp; //getting temp from JSON

      const weatherDescription = weatherData.weather[0].description;

      const icon = weatherData.weather[0].icon;

      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; //It is to get the icon url

      console.log(temp1);

      console.log(weatherDescription);

      const m1 = "<p>The weather is currently " + weatherDescription + "</p>"; //It allows us to write multiple response send
      const m2 = "<h1>The temperature of "+query+" is " + temp1 + " degrees Celsius. </h1>";;
      const m3 = "<img src=" + imageUrl + " >";

      res.send(m1+"<br>"+m2+"<br>"+m3);
    })
  });


});
app.listen(3000, function() {
  console.log("Server runs on port 3000");
});

/*
const query = "Pune";
const apiKey = "90d5c63c2057334f76d4c46988b7efb1";
const unit = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {

        const weatherData = JSON.parse(data); //converting Byte data to JSON format

        const temp = weatherData.main.temp; //getting temp from JSON

        const weatherDescription = weatherData.weather[0].description;

        const icon = weatherData.weather[0].icon;

        const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"; //It is to get the icon url

        console.log(temp);

        console.log(weatherDescription);

        res.write("<p>The weather is currently "+ weatherDescription+"</p>") //It allows us to write multiple response send
        res.write("<h1>The temperature of Pune is "+ temp + " degrees Celsius. </h1>");
        res.write("<img src="+imageUrl+" >");

        res.send();
        })
    });
    */

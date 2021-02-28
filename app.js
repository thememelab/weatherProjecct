// App modules required
const express = require("express");
const app = express();
const https = require('https');
const {parse,stringify,assign } = require('comment-json')
const fs = require('fs')
const bodyParser = require('body-parser')


// app usage
app.use(bodyParser.urlencoded({ extended: false }))




// HTTP Request
var temp;
var description;
var feelsLike;
var userMessage;
var userCity;
var imageUrl;
var appId =  'c3572150be7ec5d4d47a708d4d021ada';


app.get("/", (req,res) => {
  res.sendFile(__dirname +'/index.html')
})



app.post("/", (req, res ) => {

  var userCity = req.body.city
  var openUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&appid=' + appId +'&units=imperial'

    https.get(openUrl, (response) => {
        response.on('data', (d) => {
        const weatherData = JSON.parse(d)
        //console.log(weatherData)
        temp = weatherData.main.temp
        description = weatherData.weather[0].description
        feelsLike = weatherData.main.feels_like
        var icon  = weatherData.weather[0].icon
        imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        res.write("<p> the weather in " + userCity + "i s " + description + "</p>")
        res.write(" <h1> the weather  is " + temp + " but feels " + feelsLike + "</h1> ")
        res.write("<img src=" + imageUrl + ">")
        res.send()

        });
      }).on('error', (e) => {
        console.error(e);
      });
})






app.listen(3000, ()=> {
  console.log("server running on port 3000")
})

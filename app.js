// jshint esverion:6

const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

// app.use(express.static("static")); 

app.use(bodyParser.urlencoded ({extended: true}));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function ( req, res) {

    // console.log(req.body.cityName);

        const query = req.body.cityName;

    const apiKey = "ec6b0ccc646115d95c0188268e5237ea";

    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey + "&units=" + unit;

    https.get( url, function (response) {

        console.log(response.statusCode);

        response.on("data", function (data) {

            const weatherData = (JSON.parse(data));
            
        //     const object = {

        //         name: "Aditya",
        //         favoriteColor: "Black",
        //         hobby: "Football"
        //     }
        //     console.log(JSON.stringify(object));
        // });

        const temp = weatherData.main.temp;

        // console.log(temp);

        const des = weatherData.weather[0].description;

        const icon = weatherData.weather[0].icon;

        const pres = weatherData.main.pressure;

        const humd = weatherData.main.humidity;

        const wind = weatherData.wind.speed;

        

        // body.style.backgroundImage = url ('bg.jpg');

        const imageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius. </h1>");

        res.write("<h1>Description of weather prevailing there: " + des + "</h1>");

        res.write("<img src=" +imageURL + ">");

        res.write("<h1>Pressure: " + pres + " hPa</h1>");

        res.write("<h1>Humidity: " + humd + " %</h1>");

        res.write("<h1>Wind Speed " + wind + " m/s</h1>");

        res.send();

    });

});

    // console.log("Post request recieved");
});

app.listen(3000, function () {

    console.log("Server is running on port 3000");
} );
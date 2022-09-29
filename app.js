const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("The server has been started and it runs on port 3000.");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const apiKey = "124c5ed19bb062ae62215bebb0da4ccd"
    const city = `${req.body.cityName}`
    const units = "metric";

    https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feels_like = weatherData.main.feels_like;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            //const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
            const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.write("<p>The weather is currently " + description + ".</p>");
            res.write("<h1>" + `The temperature in ${city} is ${temp} degrees Celcius.` + "</h1>");
            res.write("<img src=" + imgURL +">");
            res.send();
        });
    });
});

    
//code to read and set any environment variables with the dotenv package
require("dotenv").config();

//Spotify package
var Spotify = require("node-spotify-api");

//Code required to import the key.js
var keys = require("./key");

var spotify = new Spotify(keys.spotify);

//Axios package
const axios = require("axios");

//Moment package
const moment = require("moment");

//fs package
const fs = require("fs");

//store the arguments entered by the user
const request = process.argv[2];
var search = process.argv.slice(3).join(" ");

//Store the request made by the user 
//This request will then be added to the log.txt file
const textLog  = request + " " + search + ", ";

//Depending on the user request we will execute the right function
switch(request) {
    case "concert-this":
        concert();
        addRequest();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        addRequest();
        break;
    case "movie-this":
        movieThis();
        addRequest();
        break;
    case "do-what-it-says":
        doWIS();
        addRequest();
        break;   
}

//function that write the request entered by the user in the log.txt file
function addRequest() {
    fs.appendFile("log.txt", textLog, function(err){
        if (err) {
            console.log(err);
        } 
    });
};

//If the concert function is called
function concert() {

    //Request to the Bands in town API
    let queryUrl = `https://rest.bandsintown.com/artists/${search}/events?app_id=codingbootcamp`;

    console.log(queryUrl);
   
    axios
    .get(queryUrl)
    .then(function(response){
        console.log("\n***************");
        for (var i = 0; i < response.data.length; i++) {
            console.log("Venue: " + response.data[i].venue.name);
            console.log("Location: " + response.data[i].venue.country + ", " + response.data[i].venue.city);
            //Put the date to the right format
            let eventDate = moment(response.data[i].datetime).format("MM/DD/YYYY");
            console.log("Date: " + eventDate);
            console.log("\n***************");
        }
       
    });
}


//If the spotifyThisSong function is called
function spotifyThisSong() {

    let queryUrl = `https://api.spotify.com/v1/search?q=${search}&type=track`;

    console.log(queryUrl);

    spotify
    .request(queryUrl)
    .then(function(response){
        console.log(response);

    });
}



//   spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });


//If the movieThis function is called
function movieThis() {
    //Test if the user typed a movie or not
    if (process.argv[3] = "") {
        let queryUrl = `http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy`;
        console.log(queryUrl);

        axios
        .get(queryUrl)
        .then(function(response) {
            console.log("\n***************");
            console.log(response.data.Title);
            console.log("Came out in: " + response.data.Year);
            console.log("Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Produced in: " + response.data.Country);
            console.log("Langage: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        });      
    } else {
        let queryUrl = `http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=trilogy`;
        console.log(queryUrl);
        axios
        .get(queryUrl)
        .then(function(response) {
            console.log("\n***************");
            console.log(response.data.Title);
            checkIfExist("Came out in: " , response.data, "Year");
            checkIfExist("Rating: " , response.data, "imdbRating");
            // for (var i = 0; i < response.data.Ratings.length; i++) {
            //     if (response.data.Ratings[i].Source == "Rotten Tomatoes") {
            //         console.log("Rotten Tomatoes: " + response.data.Ratings[i].Value);
            //     } else {
            //         console.log ("No value for Rotten Tomatoes");
            //     }
            // }
            checkIfExist("Rotten Tomatoes: " , response.data.Ratings[1], "Value");
            checkIfExist("Produced in: " , response.data, "Country");
            checkIfExist("Langage: " , response.data, "Language");
            checkIfExist("Plot: " , response.data, "Plot");
            checkIfExist("Actors: " + response.data.Actors);
        });      
    }
};

//If the doWIS function is called
function doWIS() {

}

//Function to check if one of the data we want to display is unexisting
//For exemple some movies doesn't have a "Rotten tomatoes" field or value
//calling this checkIfExist function will allow us to print an error message
//and finish printing the other existing datas
function checkIfExist(text, field, value){

    if (field === undefined){
        console.log(text, "Nothing Found");
    } else {
        console.log(text, field[value]);
    }

}
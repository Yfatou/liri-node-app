//code to read and set any environment variables with the dotenv package
require("dotenv").config();

//Code required to import the key.js
//var spotify = new Spotify(keys.spotify);

//Bands in town node package
const bandsintown = require("bandsintown");

//Axios package
const axios = require("axios");

//var Events = new BandsInTownEvents;

//store the arguments entered by the user
const request = process.argv[2];
var search = process.argv.slice(3).join(" ");

//Depending on the user request we will execute the right function
switch(request) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWIS();
        break;   
}


// Events.setParams({
//     "app_id":"codingbootcamp", //can be anything
//     "artists":[ //accepts string for single artist or an array of artist names
//       "Wilco",
//       "Yeah Yeah Yeahs"
//     ]
//   });
   
  //get your events with success and error callbacks
//   Events.getEvents(function( events ){
//     for(var i = 0; i < events.length; i++){
//       console.log( events[i].venue.city + ", " + events[i].venue.region );
//     }
//   },function( errors ){
//     console.log(errors);
//   });


//If the concert function is called
// function concert() {

//     //Request to the Bands in town API
//     let queryUrl = `https://rest.bandsintown.com/artists/${artistBandName}/events?app_id=codingbootcamp`;

//     console.log(queryUrl);
//     //SHOULD USE AXIOS.GET(QUERYURL)
//     bandsintown
//         //.getArtistEventList(artistBandName)
//         .getArtistEventList(queryUrl)
//         //.get(queryUrl)
//         .then(function(response){
//             let venueName = response.data.venue.name;
//             console.log("Venue name: " + venueName);
//         });

// }

//If the movieThis function is called
function movieThis() {
    //Test if the user typed a movie or not
    if (process.argv[3] = " ") {
        let queryUrl = `http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy`;
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
            console.log("Came out in: " + response.data.Year);
            console.log("Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Produced in: " + response.data.Country);
            console.log("Langage: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        });      
    }
};

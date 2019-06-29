require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require('./keys.js');

// Include file system module
var fs = require("fs");
var liriArgv = process.argv;
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

var request = require('request');



//Multiple words
var title = "";
for (var i = 3; i < liriArgv.length; i++) {
    if (i > 3 && i < liriArgv.length) {
        title = title + " " + liriArgv[i];
    } else {
        title = title + liriArgv[i];
    }
};


function concertapi(artist) {
    var concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // Make a request for a user with a given ID
    axios.get(concertURL)
        .then(function (response) {
            // console.log(response.data);
            //console.log 


            // string containing the concert data to print to the console    
            console.log('Name of Venue: ' + response.data[i].venue.name),
                console.log('Location of Venue: ' + response.data[i].venue.city);
            // creating var for concert date
            var concertDate = response.data[i];
            console.log('Date of Event: ' + moment(concertDate).format('L'));
        })
}
// concertapi("Ariana Grande")

var getArtistNames = function (artist) {
    return artist.name;
}

var spotifyapi = function (songName) {
    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            // print artist name
            console.log('Artist(s): ' + songs[i].artists.map(getArtistNames));
            // pring song name
            console.log('Song Name: ' + songs[i].name);
            // preview link for song
            console.log('Preview This Song: ' + songs[i].preview_url);
            // pring album title
            console.log('Album:' + songs[i].album.name);
            console.log('-------------------------------------------------------------');
        }
    });
}

function getMovie(movie) {

    var movieSearch;
    if (movie === '') {
        movieSearch = 'Mr. Nobody';
    } else {
        movieSearch = movie;
    }

    var omdbapi = 'http://www.omdbapi.com/?t=' + movieSearch + '&y=&plot=full&apikey=70dba95e';

    axios.get(omdbapi)
        .then(function (response) {

            //general header
            console.log('Movie Information')
            // just a line
            console.log('------------------------------')
            // print movie title
            console.log('Movie Title: ' + response.data.Title);
            // print year released
            console.log('Year Released: ' + response.data.Year);
            // print IMDB Rating
            console.log('IMDB Rating: ' + response.data.imdbRating);
            // print Rotten Tomatoes Rating
            console.log('Rotten Tomatoes Rating: ' + response.data.tomatoRating);
            // print Country it was produced in
            console.log('Country Produced: ' + response.data.Country);
            // print language
            console.log('Language: ' + response.data.Language);
            // print plot
            console.log('Plot: ' + response.data.Plot);
            // print actors and actresses
            console.log('Actors: ' + response.data.Actors);
        })


}




function readFile() {
    // Use built-in readfile method to access random.txt
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        //Catch data and use .split to seperate objects in array
        var dataArr = data.split(",");

        // Take Objects from random.txt to pass as parameters
        userRequest = dataArr[0];
        userQuery = dataArr[1];
        // Call the function within new parameters
        userInput(userRequest, userQuery);
    });
}


function userInput(liriResponse, insideString) {
    switch (liriResponse) {
        case "concert-this":
            concertapi(insideString);
            break;
        case "spotify-this-song":
            spotifyapi(insideString);
            break;
        case "movie-this":
            getMovie(insideString);
            break;
        case "do-what-it-says":
            readFile();
            break;
        default:
            console.log("command not known");
    }
}

var runCommand = function (argOne, argTwo) {
   userInput(argOne, argTwo);
    };

runCommand(process.argv[2], process.argv[3]);
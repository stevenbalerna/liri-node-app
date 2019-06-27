require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require('./keys');

// Include file system module
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

var request = require('request');

function concertapi(artist) {
    var concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // Make a request for a user with a given ID
    axios.get(concertURL)
        .then(function (response) {
            // handle success
            console.log(response.data);
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
    // Append the command to the log.txt file
    fs.appendFile('./log.txt,', 'User Command: node liri.js movie-this ' + movie + '\n\n', (err) => {
        if (err) throw err;
    });

    var movieSearch;
    if (movie === '') {
        movieSearch = 'Mr. Nobody';
    } else {
        movieSearch = movie;
    }
    // Construct the query string
    var omdbapi = 'http://www.omdbapi.com/?t=' + movieSearch + '&y=&plot=full&apikey=70dba95e';

    // Send the request to OMDB
    request(omdbapi, function (error, response, body) {
        if (error || (response.statusCode !== 200)) {
            var errorStr1 = 'ERROR: Retrieving OMDB entry -- ' + error;

            // Append the error string to the log.txt file
            fs.appendFile('./log.txt', errorStr1, (err) => {
                if (err) throw err;
                console.log(errorStr1);
            });
            return;
        } else {
            var data = JSON.parse(body);
            if (!data.Title && !data.Released && !data.imdbRating) {
                var errorStr2 = 'ERROR: No movie info retrieved!';

                // Append the error string to the log.txt file
                fs.appendFile('./log.txt', errorStr2, (err) => {
                    if (err) throw err;
                    console.log(errorStr2);
                });
                return;
            } else {
                // Pretty print the movie information
                var outputStr = '------------------------\n' +
                    'Movie Information:\n' +
                    '------------------------\n\n' +
                    'Movie Title: ' + data.Title + '\n' +
                    'Year Released: ' + data.Released + '\n' +
                    'IMBD Rating: ' + data.imdbRating + '\n' +
                    'Rotten Tomatoes Rating: ' + data.tomatoRating + '\n' +
                    'Country Produced: ' + data.Country + '\n' +
                    'Language: ' + data.Language + '\n' +
                    'Plot: ' + data.Plot + '\n' +
                    'Actors: ' + data.Actors + '\n';


                // Append the output to the log.txt file
                fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr + '\n', (err) => {
                    if (err) throw err;
                    console.log(outputStr);
                });
            }
        }
    });
}

    function doThis() {
        // Use built-in readfile method to access random.txt
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            //Catch data and use .split to seperate objects in array
            let dataArr = data.split(",");

            // Take Objects from random.txt to pass as parameters
            userInput = dataArr[0];
            userQuery = dataArr[1];
            // Call the function within new parameters
            userCommand(userInput, userQuery);
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
                case "do-this":
                dothisapi(insideString);
                break;
            default:
                console.log("command not known");
        }
    }

    var runCommand = function (argOne, argTwo) {
        userInput(argOne, argTwo);
    };



     // runCommand(process.argv[2], process.argv.slice(3).join(" "))}
       runCommand(process.argv[2], process.argv[3]);

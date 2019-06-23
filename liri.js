// Require npm to link to keys
require('dotenv').config()

// Require the key.js file 
var keys = require('./keys');

var Spotify = require('node-spotify-api');


var spotify = new Spotify({
	id: '6d7a915bec4f4584afd47d6c5cd9722c',
	secret: '869747a3afc24de696bdd20fb7a4454e'
});

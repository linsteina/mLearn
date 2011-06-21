// Required dependancies
var io = require('socket.io');
var app = require('express').createServer();
var fs = require('fs');

// State is the current slide position
var state = 1
// Clients is a list of users who have connected
var clients = [];
// Bind socket.io to express
var socket = io.listen(app);
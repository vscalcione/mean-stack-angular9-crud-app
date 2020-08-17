const express = require('express');
const router = express.Router();
const app = express();
const server = require('http').createServer(app);
const io = require('socketio')(server);
const Sales = require('../models/Sales');

server.listen(4000);

/** Socket.io */
io.on('connection', function(socket) {
    socket.on('updatedata', function(data) {
        io.emit('update-data', { data: data });
    });
});

/** List data */
router.get('/', function(req, res) {
    Sales.find(function(err, sales) {
        if (err) return next(err);
        res.json(sales);
    });
})
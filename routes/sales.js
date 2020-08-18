const express = require('express');
const router = express.Router();
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Sales = require('../models/Sales');

server.listen(4000);

// Socket
io.on('connection', function(socket) {
    socket.on('updatedata', function(data){
        io.emit('update-data', { data: data });
    });
});

// List data
router.get('/', function(req, res, next){
    Sales.find(function(err, sales) {
        if (err) return next(err);
        res.json(sales);
    });
});

// Items sales report
router.get('/itemsales', function(req, res, next) {
    Sales.aggregate([
        {
            $group: {
                _id: { itemId: '$itemId', itemName: '$itemName' },
                totalPrice: { $sum: '$totalPrice' }
            }
        },
        {
            $sort: {$totalPrice: 1}
        }
    ], function(err, sales) {
        if (err) return next(err)
        res.json(sales);
    });
});

// Get data by id
router.get('/:id', function(req, res, next){
    Sales.findById(req.params.id, function(err, sales) {
        if (err) return next(err);
        res.json(sales);
    });
});

// Post data
router.post('/', function(req, res, next){
    Sales.create(req.body, function(err, sales){
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(sales);
    });
});

// Put data
router.put('/:id', function(req, res, next){
    Sales.findByIdAndUpdate(req.params.id, req.body, function(err, sales){
        if (err) {
           console.log(err);
           return next(err);
        }
        res.json(sales);
    });
});

// Delete data by id
router.delete('/:id', function(req, res, next){
    Sales.findByIdAndRemove(req.params.id, req.body, function(err, sales){
        if (err) return next(err);
        res.json(sales);
    });
});

module.exports = router;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost/sales-report', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connection successfully on mongodb!')
}).catch((error) => {
    console.log(error);
})

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const salesRouter = require('./routes/sales');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', salesRouter);

module.exports = app;

const http = require('http');
const express = require('express')
const app = express()
const path = require('path')
const port = 8080;


app.use(express.static(path.join(__dirname, '../public')));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'about.html'));
});

app.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'contact-me.html'));
});

app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname, '../public', '404.html'));
});


app.listen(port, function() {
    console.log('yo')
})
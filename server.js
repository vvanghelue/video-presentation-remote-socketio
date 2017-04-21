var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var serveStatic = require('serve-static')
var path = require('path')

app.use(serveStatic(path.join(__dirname, 'public')))
app.use(serveStatic(path.join(__dirname, 'node_modules')))

app.get('/socket.io-client/dist/socket.io.min.js', function(req, res){
  res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.min.js');
});

io.on('connection', function(socket){
  socket.on('changeVideo', function(data){
    io.emit('changeVideo', data);
    console.log(data);
  });
  socket.on('play', function(data){
    io.emit('play');
    console.log('play');
  });
  socket.on('pause', function(data){
    io.emit('pause');
    console.log('pause');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'index.html'))
});


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
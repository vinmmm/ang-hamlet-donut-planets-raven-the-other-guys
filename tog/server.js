/* An express server that supports get and post routes for and Angularjs Controller*/



var express = require ('express');
var bodyParser = require ('body-parser');
var app = express();
app.use('/', express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
function initPlay(){
	var characters = ['Alan', 'Terry', 'Gene', 'Sheila', 'Danson', 'Highsmith', 'Bob'];
	var playObj = {};
	for (var characterIDX in characters){
		playObj [characters[characterIDX]] = 
		Math.floor(Math.random() * 5 + 1);
	}
return playObj;
}
var playCharacters = initPlay();
app.get('/reset/data', function (req, res){
	playCharacters = initPlay();
	res.json(playCharacters);
});
app.post('/take/character', function (req, res){
	if (playCharacters[req.body.character] > 0){
		playCharacters[req.body.character] = 
		playCharacters[req.body.character] - 1;
		res.json(playCharacters);

	}else {
		res.json(400, { msg: 'Sorry ' + req.body.character +
	                         ' was killed.'});
	}
});
app.listen(8191);




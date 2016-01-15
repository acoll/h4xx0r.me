var fs = require('fs');
var _ = require('underscore');
var Firebase = require('firebase');

var api = new Firebase('https://h4xx0r.firebaseio.com/');

var app = document.getElementById('app');
var body = document.getElementsByTagName('body')[0];
var hackername = document.getElementsByClassName('hackername')[0];

app.innerHTML = '... hack faster ...\n\n\n';

var content = 
	[
		'src/index.jade',
		'--------------',
		fs.readFileSync('./src/index.jade').toString(),
		'src/main.js',
		'-----------',
		fs.readFileSync('./src/main.js').toString(),
		'src/style.css',
		'-----------',
		fs.readFileSync('./src/style.css').toString()
	].join('\n');

document.onkeydown = function (e) {

	var numChars = _.random(1, 5);
	var newChar = content.slice(0, numChars);
	content = content.slice(numChars);
	app.innerHTML = app.innerHTML + newChar;

	body.scrollTop = body.scrollHeight;

	if(content.length < 1) {
		document.onkeydown = null;
		generateHackerName();
	}
};

function generateHackerName () {
	api.child('prefixes').once('value', p => {
		var randomPrefix = getRandomOne(p.val());
		api.child('prefixes').once('value', s => {
			var randomSuffix = getRandomOne(s.val());
			hackername.innerHTML = randomPrefix + ' ' + randomSuffix;
			hackername.className += ' active';
		});
	});
}

function getRandomOne (obj) {
	var keys = Object.keys(obj);
	return obj[keys[_.random(0, keys.length)]];
}
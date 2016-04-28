var Beam = require('beam-client-node');
var BeamSocket = require('beam-client-node/lib/ws');

var makeVoice = require('./makeVoice.js');

var child = require('child_process');
var ent = require('ent');

var speak = child.spawn('./process/Speak.exe');

var channel = "ProbablePrime";
var beam = new Beam();
var socket;

var userID = 0;
var channelID = 0;


function extractTextFromMessagePart(part) {
	if (part == undefined) {
		return '';
	}
	if (typeof part === "object") {
		if (part.type != null && part.type === 'text') {
			return part.data;
		}

		if(part.text != null) {
			return ' ' + part.text;
		}

		return '';
	}
	return part;
}

//Flatten a beam message down into a string
function flattenBeamMessage(message) {
	var result = '';
	if (message.length !== undefined) {
		if(message.length > 1 ) {
			result = message.reduce(function (previous, current) {
				if (!previous) {
					previous = '';
				}
				if (typeof previous === 'object') {
					previous = extractTextFromMessagePart(previous);
				}
				return previous + extractTextFromMessagePart(current);
			});
		} else if(message.length === 1) {
			result = extractTextFromMessagePart(message[0]);
		} else {
			return '';
		}
	} else {
		result = message;
	}
	return ent.decode(result);
}

function filter(message) {
	if(message.charAt(0) === `[`) {
		return false;
	}
	if(message.length > 300) {
		return true;
	}
	if(message.search(':dial') !== -1) {
		return true;
	}
	if(message.search(':t') !== -1) {
		return true;
	}
	if(message.search(/http|https/) !== -1) {
		return true;
	}
}

var settings="[:punct none][:error ignore on][:rate 250]";

function say(id, message) {
	if (filter(message)) {
		return;
	}
	speak.stdin.write(settings + makeVoice(id) + ' ' + message.replace(/\n/g, '') +'\n');
}
var auth = require('./config.json');
beam.use('password', auth)
.attempt()
.then(res => {
		userID = res.body.id;
		return beam.request('get', '/channels/' + channel);
}).then(res => {
		channelID = res.body.id;
		return beam.chat.join(res.body.id);
}).then(res => {
		var data = res.body;
		socket = new BeamSocket(data.endpoints).boot();
		return socket.call('auth', [channelID, userID, data.authkey]);
}).then(() => {
		console.log('You are now authenticated!');
		socket.on('ChatMessage', data => {
			console.log('We got a ChatMessage packet!');
			console.log(data.message.message);
			say(data.user_id*100, flattenBeamMessage(data.message.message));
		});
}).catch(err => {
		if(err.message !== undefined && err.message.body !== undefined) {
				err = err.message.body;
		}
		console.log('error joining chat:', err);
});

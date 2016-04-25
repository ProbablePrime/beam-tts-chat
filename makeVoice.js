// AP = AVERAGE PITCH 50 - 350
// AS = ASSERTIVENESS 0 - 100
// BR = BREATHINESS 0 - 72
// GF = adjust volume of unvoiced sylables (d, f, g, h, j, p, s, t, part of v and z) (0-100, 0=voice without airflow, above 60 raises from default)
// GV = adjust nonbreathiness of sound (0-72)
// HS = HEAD SIZE 65 - 145
// LO = VOLUME 0 - 94
// PR = PITCH RANGE 0 - 250
// RA = SPEECH RATE 120 � 580

function dv(param,value) {
	value = Math.floor(value);
	return `[:dv ${param} ${value}]`;
}
function clamp(val, min, max) {
	if (val < min) {
		return min;
	}
	if (val > max) {
		return max;
	}
	return val;
}
// AP = AVERAGE PITCH 50 - 350
// AS = ASSERTIVENESS 0 - 100
// BR = BREATHINESS 0 - 72
// GF = adjust volume of unvoiced sylables (d, f, g, h, j, p, s, t, part of v and z) (0-100, 0=voice without airflow, above 60 raises from default)
// GV = adjust nonbreathiness of sound (0-72)
// HS = HEAD SIZE 65 - 145
// LO = VOLUME 0 - 94
// PR = PITCH RANGE 0 - 250
// RA = SPEECH RATE 120 � 580
var settings = {
	pitch: (id,rand) => dv('ap', rand.intBetween(50,290)),
	tone: (id, rand) => dv('pr', rand.intBetween(0,200)),
	as: (id, rand) => dv('as', rand.intBetween(0,90)),
	br: (id, rand) => dv('as', rand.intBetween(0,60)),
	ra: (id, rand) => dv('ra', rand.intBetween(160,225))
}

function makeVoice(id) {
	var gen = require('random-seed'); // create a generator
	var rand = new gen(id);
	return '[:nb]' + Object.keys(settings).map(key => settings[key](id,rand)).join('');
}


module.exports = makeVoice;

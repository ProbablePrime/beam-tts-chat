// AP = AVERAGE PITCH 50 - 350
// AS = ASSERTIVENESS 0 - 100
// BR = BREATHINESS 0 - 72
// GF = adjust volume of unvoiced sylables (d, f, g, h, j, p, s, t, part of v and z) (0-100, 0=voice without airflow, above 60 raises from default)
// GV = adjust nonbreathiness of sound (0-72)
// HS = HEAD SIZE 65 - 145
// LO = VOLUME 0 - 94
// PR = PITCH RANGE 0 - 250
// RA = SPEECH RATE 120 � 580

function dv(param, value) {
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
// Average pitch, in Hz
// as Assertiveness, in %
// b4 Fourth formant bandwidth, in Hz
// b5 Fifth formant bandwidth, in Hz
// bf Baseline fall, in Hz
// br Breathiness, in decibels (dB)
// f4 Fourth formant resonance frequency, in Hz
// f5 Fifth formant resonance frequency, in Hz
// hr Hat rise, in Hz
// hs Head size, in %
// la Laryngealization, in %
// lx Lax breathiness, in %
// nf Number of fixed samples of open glottis
// pr Pitch range, in %
// qu Quickness, in %
// ri Richness, in %
// sm Smoothness, in %
// sr Stress rise, in Hz
// sx Sex 1 (male) or 0 (female)
// save Save the current speaker-definition
var settings = {
	pitch: (id,rand) => dv('ap', rand.intBetween(50,290)),
	tone: (id, rand) => dv('pr', rand.intBetween(0,200)),
	as: (id, rand) => dv('as', rand.intBetween(0,90)),
	br: (id, rand) => dv('br', rand.intBetween(0,45)),
	ra: (id, rand) => dv('ra', rand.intBetween(160,225)),
	hs: (id, rand) => dv('hs', rand.intBetween(90,100)),
	bf: (id, rand) => dv('bf', rand.intBetween(10,20)),
	hr: (id, rand) => dv('hr', rand.intBetween(15,20)),
	nf: (id, rand) => dv('nf', rand.intBetween(10,20)),
	sx: (id, rand) => dv('sx', rand.intBetween(0,1)),
	sr: (id, rand) => dv('sr', rand.intBetween(15,25)),
	sm: (id, rand) => dv('sm', rand.intBetween(20,30)),
	ri: (id, rand) => dv('ri', rand.intBetween(60,70)),
	lx: (id, rand) => dv('lx', rand.intBetween(0,80))
}

function makeVoice(id) {
	var gen = require('random-seed'); // create a generator
	var rand = new gen(id);
	return '[:nb]' + Object.keys(settings).map(key => settings[key](id,rand)).join('');
}


module.exports = makeVoice;

'use strict'
const express = require('express');
const fetch = require('./fetch');
const app = express();
let obj2queryStr = require('querystring').stringify;

let sendErr = res => err => {
    console.err('Nått gick snett:', err);
    res.status(500);
    res.send(err);
}

let keys = {
    typeahead: '2a6b74a2e8f34ae895a06efe53668862',
    TravelplannerV2: '6a517447db2c4a72adc256399cef82ad'
}

app.use(require('compression')({ level: 9 }));
app.use(express.static('dist'));
app.use(require('body-parser').json());

app.get('/demo.appcache', (req, res) => {
    require('fs').readFile('appcache', 'utf8', (err, data) => {
        if (err) {
            sendErr(res)(err);
        } else {
            res.contentType('text/cache-manifest');
            res.send(data);
        }
    });
});

app.post('/api/typeahead', (req, res) => {
    fetchNSend(`http://api.sl.se/api2/typeahead.json?key=${keys.typeahead}&${obj2queryStr(req.body)}`, res, json => json.ResponseData);
});

app.post('/api/search', (req, res) => {
    if (!req.body.time) {
        let [hour, minute] = new Date().toISOString().split('T')[1].split(':');
        req.body.time = `${parseInt(hour, 10) + 2}:${minute}`;
    }
    fetchNSend(`http://api.sl.se/api2/TravelplannerV2/trip.json?key=${keys.TravelplannerV2}&${obj2queryStr(req.body)}`, res,
        json => json.TripList.Trip.map(trip => Array.isArray(trip.LegList.Leg) ? [trip.LegList.Leg] : trip.LegList.Leg);
});
app.listen(process.env.PORT || 8081);

let fetchNSend = (url, res, mapper) => {
    fetch.getJSON(url).then(json => res.send(mapper ? mapper(json) : json), sendErr(res));
}

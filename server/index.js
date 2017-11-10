import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import fetch from './fetch';
import {stringify} from 'querystring'

let sendErr = res => err => {
    console.err('Nått gick snett:', err);
    res.status(500);
    res.send(err);
}
  
let fetchNSend = (url, res, mapper) => {
    fetch.getJSON(url).then(json => res.send(mapper ? mapper(json) : json), sendErr(res));
}

let keys = {
    typeahead: '2a6b74a2e8f34ae895a06efe53668862',
    TravelplannerV2: '6a517447db2c4a72adc256399cef82ad',
    deviations: '61c1121844b14fd8bc6d120e461135ad'
}

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)
app.use(require('compression')({ level: 9 }));
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
    fetchNSend(`http://api.sl.se/api2/typeahead.json?key=${keys.typeahead}&${stringify(req.body)}`, res, json => json.ResponseData);
});

app.post('/api/deviations', (req, res) => {
    fetchNSend(`http://api.sl.se/api2/deviations.json?key=${keys.deviations}&${stringify(req.body)}`, res, json => json.ResponseData);
})

app.post('/api/search', (req, res) => {
    if (!req.body.time) {
        let [hour, minute] = new Date().toISOString().split('T')[1].split(':');
        req.body.time = `${parseInt(hour, 10) + 2}:${minute}`;
    }
    fetchNSend(`http://api.sl.se/api2/TravelplannerV2/trip.json?key=${keys.TravelplannerV2}&${stringify(req.body)}`, res,
        json => json.TripList.Trip && json.TripList.Trip.map(trip => {
            trip.LegList.Leg = [].concat(trip.LegList.Leg);
            return trip;
        }) || []
    );
});

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

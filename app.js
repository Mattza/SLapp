'use strict'
const express = require('express');
const fetch = require('./fetch');
const app = express();
let querystringStringify = require('querystring').stringify

app.use(require('compression')({ level: 9 }))
app.use(express.static('dist'))
app.use(require('body-parser').json());

app.get('/demo.appcache', (req, res) => {
    require('fs').readFile('appcache', 'utf8', (err, data) => {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.contentType('text/cache-manifest');
            res.send(data)
        }
    });
})

app.post('/api/typeahead', (req, res) => {
    const searchStr = querystringStringify(req.body);
    const key = '2a6b74a2e8f34ae895a06efe53668862'
    const url = `http://api.sl.se/api2/typeahead.json?key=${key}&${searchStr}`
    fetchNSend(url, res, json => json.ResponseData);
});

app.post('/api/search', (req, res) => {
    if (!req.body.time) {
        let [hour, minute] = new Date().toISOString().split('T')[1].split(':');        
        req.body.time = `${hour}:${minute}`;
    }
    const searchStr = querystringStringify(req.body);
    const key = '6a517447db2c4a72adc256399cef82ad'
    const url = `http://api.sl.se/api2/TravelplannerV2/trip.json?key=${key}&${searchStr}`
    fetchNSend(url, res, json => {
        let mappedJson = json.TripList.Trip
        mappedJson.forEach(trip => {
            if (!Array.isArray(trip.LegList.Leg)) {
                trip.LegList.Leg = [trip.LegList.Leg];
            }
        });
        return mappedJson;
    });

})
app.listen(process.env.PORT || 8081);

let fetchNSend = (url, res, mapper) => {
    fetch.getJSON(url).then(
        json => {
            let mappedJson = mapper ? mapper(json) : json;
            res.send(mappedJson)
        },
        error => {
            res.status(500);
            res.send(error);
        }
    )
}

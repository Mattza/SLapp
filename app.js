'use strict'
const express = require('express');
const app = express();
app.use(express.static('dist'))
app.use(require('body-parser').json());

app.get('/taco',(a,b)=>b.send('tavo'))
app.post('/api/search', (req, res) => {
    const searchObj = req.body;
    console.log(searchObj);
    const searchStr = Object.keys(searchObj).reduce((acc,key) => {
        console.log(acc);
        return `${acc}&${key}=${searchObj[key].replace(/ /g,'')}`;
    },'')
    const key = '6a517447db2c4a72adc256399cef82ad'
    const host = `api.sl.se`
    
    const path = `/api2/TravelplannerV2/trip.json?key=${key}${searchStr}`
    console.log(path)
    require('http').get({
        host,path
    }, response => {
        let datas = ''
        response.on('data', data => {
            datas += data.toString();
        });
        response.on('end', () => {
            const json = JSON.parse(datas).TripList.Trip;
            json.forEach(trip => {
                if(!Array.isArray(trip.LegList.Leg)){
                    trip.LegList.Leg = [trip.LegList.Leg];
                }
            })
            res.send(json);
        })
    })
})
app.listen(process.env.PORT || 8081);
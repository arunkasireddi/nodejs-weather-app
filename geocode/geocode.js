const request = require('request');
const ftc = require('fahrenheit-to-celsius');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers');
        }
        else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        }
        else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

var geoAddressWeather = (lat, lon) => {
    request({
        url: `https://api.darksky.net/forecast/51db297c0dc81dcb16277b12670c05a9/${lat},${lon}`,
        json: true
    }, (error, response, body) => {
        var temperature = ftc(body.currently.temperature);
        var temperatureC = Math.round((temperature * 10)/10);
        console.log(`Temperature is: ${temperatureC}`);
        // console.log(JSON.stringify(body.currently.temperature, undefined, 2)); 

    });
};

module.exports.geocodeAddress = geocodeAddress;

module.exports.geoAddressWeather = geoAddressWeather;
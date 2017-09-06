const request = require('request');
const tuc = require('temp-units-conv');

var geoAddressWeather = (lat, lon, callback) => {

    request({
        url: `https://api.darksky.net/forecast/51db297c0dc81dcb16277b12670c05a9/${lat},${lon}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                temperatureInCelsius: tuc.fahrenheitToCelsius(body.currently.temperature).toFixed(2)
            });            
        }
        else {
            callback('Unable to fetch weather');
        }
    });
};

module.exports.getWeather = geoAddressWeather;
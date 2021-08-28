const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=f0ec9b09657518e195a6c4f7e34372d9&query=37.8267,-122.4233&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=f0ec9b09657518e195a6c4f7e34372d9&query=' + latitude + ',' + longitude + '&units=f'
    request({
        url: url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) {
            callback('Unable to connect to weather service!!', undefined)
        } else if (body.error) {
            callback('Unable to find location!!', undefined)
        } else {
            const desc = body.current.weather_descriptions[0]
            const temp = body.current.temperature
            const feelslike = body.current.feelslike
            callback(undefined, desc + ', The temperature is currently ' + temp + ', It feel like ' + feelslike)
        }
    })
}

module.exports = forecast
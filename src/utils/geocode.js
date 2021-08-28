const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiZGV2aWw5eHBybyIsImEiOiJja3NwYXBqNjIwMG91MzBwbzBzMzFtNDBqIn0.xleU4MdPKler5p_WkhM2ew&limit=1'
    request({
        url: url,
        json: true
    }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to location services!!', undefined)
        } else if (body.message) {
            callback('Unable to find location.Try another search!!', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode
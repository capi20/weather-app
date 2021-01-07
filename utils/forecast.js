const axios = require('axios')

const forecast = async (latitude, longitude, callback) => {
    try {
        const res = await axios({
            method: 'get',
            url: `https://api.darksky.net/forecast/53e952f22f47956d9838f9c6d034a0cb/${latitude},${longitude}`
        })
        
        callback(undefined, res.data.daily.data[0].summary + " It is currently " + res.data.currently.temperature + " degrees out. There is a " + res.data.currently.precipProbability + "% chance of rain.")

    } catch (err) {
        callback('Unable to connect to weather service!', undefined)
    }
}

module.exports = forecast
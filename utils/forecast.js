const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const forecast = async (latitude, longitude, callback) => {
    try {
        const res = await axios({
            method: 'get',
            url: `https://api.darksky.net/forecast/${process.env.FORECAST_KEY}/${latitude},${longitude}?exclude=hourly,flags&units=si`
        })
        
        callback(undefined, `${res.data.daily.data[0].summary} It is currently ${res.data.currently.temperature} degrees out. There is a ${res.data.currently.precipProbability}% chance of rain.`)

    } catch (err) {
        callback('Unable to connect to weather service!', undefined)
    }
}

module.exports = forecast
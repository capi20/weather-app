const axios = require('axios')

const geocode = async (address, callback) => {
    try {
        const res = await axios({
            method: 'get',
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2h5YW0tMjAiLCJhIjoiY2tqbW02cjJmMHpieTJzczJvdHZscHVhaSJ9.ZN1753kbXXQHs8q2bba1Ow`
        })
        if (res.data.features.length > 0) {
            callback(undefined, {
                latitude: res.data.features[0].center[1],
                longitude: res.data.features[0].center[0],
                location: res.data.features[0].place_name
            })
        } else {
            callback('Unable to find location. Try another search.', undefined)
        }
    } catch (err) {
        callback('Unable to connect to location services!', undefined)
    }
}

module.exports = geocode
const express = require('express')
const axios = require('axios')
const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.use(express.json());

const publicDir = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide an address!"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
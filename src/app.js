const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

// Setup static directory to use
app.use(express.static(publicDirPath))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Geffen Maz'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Geffen Maz'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        message: 'This is the help message',
        name: 'Geffen Maz'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Geffen Maz'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Geffen Maz'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4ead5d395f375e536bddd88051d890b3&query=' + latitude + ',' +longitude
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service')
        } else if(body.error){
            callback('Unable to find location')
        } else {
            const weather = body.current.weather_descriptions[0] + 
            '. It is currently ' + body.current.temperature + 
            ' degress out. It feels like ' + body.current.feelslike +
            ' degress out. Humidity is '  + body.current.humidity + 
            '%'
            callback(undefined,weather)
        }
    })
}

module.exports = forecast
const mongoose = require('mongoose')

const stationSchema = new mongoose.Schema({
  nimi: String,
  namn: String,
  name: String,
  osoite: String,
  address: String,
  kaupunki: String,
  stad: String,
  x: String,
  y: String,
  journeysFrom: Number,
  journeysTo: Number,
  avgDistanceFrom: Number,
  avgDistanceTo: Number,
  mostPopularReturnStations: Array,
  mostPopularDepartureStations: Array,
})

stationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Station', stationSchema)

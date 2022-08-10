const express = require('express')
const app = express()
const ck = require('ckey')
const mongoose = require('mongoose')
const cors = require('cors')
const Journey = require('./models/journey')
const Station = require('./models/station')

const PORT = ck.PORT
const url = ck.MONGODB_URL

app.use(cors())

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connecting to MongoDb:', err.message)
  })

app.get('/api/stations', (req, res) => {
  Station.find({}).then((stations) => {
    res.json(stations)
  })
})

app.get('/api/journeys', (req, res) => {
  const pageNumber = req.query.page - 1
  Journey.find()
    .sort({ _id: 1 })
    .skip(pageNumber * 100)
    .limit(100)
    .then((journeys) => {
      res.json(journeys)
    })
})

app.get('/api/stations/:id', (req, res) => {
  Station.findById(req.params.id).then((station) => {
    res.json(station)
  })
})

app.get('/api/journeys/:id', (req, res) => {
  Journey.findById(req.params.id).then((journey) => {
    res.json(journey)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

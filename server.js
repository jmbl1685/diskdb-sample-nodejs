'use strict'

const express = require('express')
const cors = require('cors')
const { resolve } = require('path')
const db = require('diskdb').connect(resolve('./data'), ['frameworks'])
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/framework', (req, res) => {
    const data = db.frameworks.find()
    res.status(200).send(data)
})

app.post('/framework', (req, res) => {
    const { name, img } = req.body
    const data = db.frameworks.save({ name, img, votes: 0 })
    res.status(200).send(data)
})

app.get('/framework/vote/:_id', (req, res) => {
    const { _id } = req.params
    const framework = db.frameworks.findOne({ _id })
    db.frameworks.update({ _id }, { votes: (framework.votes + 1) })
    res.status(200).send(framework)
})

app.listen(3000, () => {
    console.log('Server running')
})




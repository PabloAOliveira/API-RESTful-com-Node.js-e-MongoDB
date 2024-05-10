const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    number: Number,
    city: String,
})

module.exports = Person
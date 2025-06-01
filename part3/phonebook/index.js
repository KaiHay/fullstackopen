const express = require('express')
//const mongoose = require('mongoose')

const app = express()
require('dotenv').config()
const Contacts = require('./models/contacts')
var morgan = require('morgan')
app.use(express.json())
app.use(morgan('tiny'))

app.use(express.static('dist'))

// const password= process.argv[2]
// const url = `mongodb+srv://kaihay168:${password}@cluster0.7e2n5pg.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`
// mongoose.set('strictQuery', false)
// mongoose.connect(url)
// const pbSchema= new mongoose.Schema({
//   name: { type: String, required: true},
//   number: String,
// })

// pbSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject._v
//   }
// })
//const Contact= mongoose.model('Contact',pbSchema)



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Contacts.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/info', (request, response) => {
  const time = new Date().toString()
  response.send(`<p>Phone book has info for ${Contacts.length} people</p>
        <p>${time}</p>
        `)
})

app.get('/api/persons/:id', (request, response, next) => {
  Contacts.findById(request.params.id).then(contact => {
    response.json(contact)
  }).catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response) => {
  Contacts.findByIdAndDelete(request.params.id).then(
    deletedPerson => {
      if (!deletedPerson) {
        return response.status(404).json({ error: 'person not found' })
      }
      response.status(204).end()
    }
  )
})
const generateId = () => {
  return String(Math.floor(Math.floor(Math.random() * 99999999)))
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Contacts({
    id: generateId(),
    name: body.name,
    number: body.number || 0,

  })

  //persons = persons.concat(person)

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }
  )
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
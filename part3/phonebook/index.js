const express = require('express')
const mongoose = require('mongoose')
const app = express()
var morgan = require('morgan')
app.use(express.json())
app.use(morgan('tiny'))

app.use(express.static('dist'))

const password= process.argv[2]
const url = `mongodb+srv://kaihay168:${password}@cluster0.7e2n5pg.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url)
const pbSchema= new mongoose.Schema({
  id: String,
  name: String,
  number: String,
})

pbSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})
const Contact= mongoose.model('Contact',pbSchema)


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts=>{
    response.json(contacts)
    })
  })

  app.get('/info',(request,response)=> {
    const time = new Date().toString()
    response.send(`<p>Phone book has info for ${persons.length} people</p>
        <p>${time}</p>
        `)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const note = persons.find(note => note.id === id)
    
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    console.log("hi")
    response.status(204).end()
  })
  const generateId = () => {
    return String(Math.floor(Math.floor(Math.random()*99999999)))
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    if(!body.number){
        return response.status(400).json({ 
          error: 'number missing' 
        })
    }
    if(persons.some(person=>person.name===body.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    }
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number || 0,
      
    }
  
    persons = persons.concat(person)
  
    response.json(persons)
  })
  
const PORT = process.env.PORT||3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
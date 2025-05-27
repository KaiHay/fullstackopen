const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kaihay168:${password}@cluster0.7e2n5pg.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)



const numberSchema = new mongoose.Schema({
  content: String,
  number: String,
})

const Number = mongoose.model('Number', numberSchema)

if (process.argv[3]) {
  if (!process.argv[4]){
    mongoose.connection.close()
    console.log('need name and number')
    return
  }
  console.log('added', process.argv[3], ' number', process.argv[4], ' to phonebook')

  const enter = new Number({
    content: process.argv[3],
    number: process.argv[4],
  })

  enter.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
} else {

  Number.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(note => {
      console.log(note.content, note.number)
    })
    mongoose.connection.close()
  })
}

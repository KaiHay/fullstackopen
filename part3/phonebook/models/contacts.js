const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const dburl = process.env.MONGODB_URI

console.log('connecting to', dburl)
mongoose.connect(dburl)
    .then(result=>{
        console.log('connected')
    })
    .catch(error=> {
        console.log('error connecting to db:', error.message)
    })
const pbSchema= new mongoose.Schema({
  name: { type: String, required: true},
  number: String,
})
pbSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Contacts', pbSchema)
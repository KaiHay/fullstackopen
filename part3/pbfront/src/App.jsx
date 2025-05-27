import { useState } from 'react'
import { useEffect } from 'react'
import bookService from  './services/phonebook'


const Noti = ({message}) => {
  if (message===null){
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}
const Fade =({setErrorMessage}) => {
  setTimeout(() =>setErrorMessage(null), 2000)
  return
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('something happened')
  
  useEffect(()=> {
    console.log('effect')
    bookService
      .getAll()
      .then(response => {
        console.log("hi,", response)
        setPersons(response||[])
      })
  },[])



  const addPerson=(a)=>{
    if(persons.some((person)=> person.name===newName)) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    a.preventDefault()
    //setPersons([...persons, {name: newName, number: newNumber}])
    //setNewName('')
    //setNewNumber('')

    bookService
      .create({name: newName, number: newNumber})
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Added ${newName} successfully`)
        setTimeout(() => setErrorMessage(null), 2000)
      })
  }
  const rmPerson=(id, name)=> {
    bookService
      .delPerson(id)
      .then(response=>{
        setPersons(persons.filter(person=>person.id!==id))
        setErrorMessage(`Deleted ${name} successfully`)
        setTimeout(() => setErrorMessage(null), 2000)
      })
  }



  return (
    <div>
      <Noti message={errorMessage} />
      <Fade setErrorMessage={setErrorMessage}/>
      
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(a)=>setNewName(a.target.value)} />
        </div>

        <div>
          Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">submit</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>
        <p key={person.name}>{person.name} {person.number}
        <button onClick={()=>rmPerson(person.id, person.name)}>Delete</button>
        </p>
        </div>
      ))}
    </div>
  )
}

export default App

const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}
const Part = ({ part, exercise }) => {
  return (
    <>
      <p>
        {part} {exercise}
      </p>
    </>
  )
}
const Content = ({parts}) => {
  const part1=parts[0].name
  const part2=parts[1].name
  const part3=parts[2].name

  const exercise1=parts[0].exercises
  const exercise2=parts[1].exercises
  const exercise3=parts[2].exercises
  
  return (
    <div>
      <Part part= {part1} exercise={exercise1} />
      <Part part={part2} exercise={exercise2} />
      <Part part={part3} exercise={exercise3} />
    </div>
  )
}
const Total = ({ total }) => {
  return (
    <>
      <p>
        Number of exercises {total}
      </p>
    </>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  const tot = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={tot} />
    </div>
  )
}

export default App
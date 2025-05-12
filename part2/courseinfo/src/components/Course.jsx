const Fourse = ({course}) => {
    const pts = course.parts
    const total= pts.reduce((s,p)=> s+p.exercises, 0)
    console.log(total);
    
    return(
      <div>
        <h1>{course.name}</h1>
        {pts.map((ts)=> <p key={ts.id}>{ts.name} {ts.exercises}</p>)}
        <p>total of {total} exercises</p>
      </div>
    )  
  }
  const Course = ({courses}) => {
  
    
    return(
      <div>
        {courses.map((a) => <Fourse key={a.id} course={a} />)}
      </div>
    )
  }

  export default Course
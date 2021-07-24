import { useState, useEffect } from 'react'
import Header from './component/Header'
import Tasks from './component/Tasks'
import AddTask from './component/AddTask'
import About from './component/About'
import Footer from './component/Footer'
import { BrowserRouter, Route } from 'react-router-dom'


function App() {
  const [showAddtask, setShowAddtask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const gettasks = async () => {
      const data = await fetchtasks() 
      setTasks(data)    
    }
    gettasks()
  }, [])

  // fetch Tasks
  const fetchtasks = async (id='') => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()        
    return data
  }

  // add task
  const addtask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method:'DELETE'})
    setTasks(tasks.filter(task => task.id !== id))
  }

  // toggle Reminder
  const toggleReminder = async (id) => {
    const toggleToTask = await fetchtasks(id)
    const updTask = {...toggleToTask, reminder: !toggleToTask.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  return (
    <BrowserRouter>
    <div className="container">
      <Header title="Task Tracker" onAdd = {() => setShowAddtask(!showAddtask)} showAdd={showAddtask}/>
      <Route exact path="/" render={(props) =>(
          <>
            {showAddtask && <AddTask onAdd={addtask} />}
            { tasks.length > 0 ?  <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Task To Show'}
          </>
        )} />
      <Route path="/about" render={About} />
      <Footer />
    </div>    
    </BrowserRouter>    
  );
}

export default App;

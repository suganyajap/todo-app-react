import './AddTask.css'
import React ,{useState}from 'react'
import axios from 'axios'
function AddTask(props) {
    const [tasks,setTasks] = useState("")
    const addtask = () => {
        if(tasks.trim() === ''){
            return 
        } else {
            axios.post('http://localhost:9000/task' , {
                task : tasks,
                isComplete : false
            }).then(res => {
                setTasks("")
                props.addTask(res.data)
            }).catch(err => console.log(err))
        }
    }
    return (
        <div className = 'addtask'>
            <input type='text' placeholder = 'Add Task . . .' value = {tasks} onChange = {event => setTasks(event.target.value)}/>
            <button onClick = {() => addtask()}>Add Task</button>
        </div>
    )
}

export default AddTask
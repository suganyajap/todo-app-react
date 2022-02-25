import './AddTask.css'
import React ,{useState}from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddTask(props) {
    const [tasks,setTasks] = useState("")
    const addtask = () => {
        if(tasks.trim() === ''){
            return 
        } else {
            axios.post('https://my-todo-app-node.herokuapp.com/task' , {
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
            {/* <input type='text' placeholder = 'Add Task . . .' value = {tasks} onChange = {event => setTasks(event.target.value)}/>
            <button onClick = {() => addtask()}>Add Task</button> */}
            <TextField id="standard-basic" label="addtask" variant="standard" type='text' placeholder = 'Add Task . . .' value = {tasks} onChange = {event => setTasks(event.target.value)} />
            <Button variant="contained" color="success" onClick = {() => addtask()}>
  Add Task</Button>

        </div>
    )
}

export default AddTask
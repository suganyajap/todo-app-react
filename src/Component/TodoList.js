import './TodoList.css'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
function TodoList(props) {
    const todolist = props.todolist.map((tasks,index) => {
        const taskComplete = task => {
            axios.put(`http://localhost:9000/task/${task._id}` , {
                _id : tasks._id,
                task: tasks.task,
                isComplete : !tasks.isComplete
            }).then(res => props.taskComplete(res.data)).catch(err => console.log(err))
        }
        const removeTask = id => {
            axios.delete(`http://localhost:9000/task/${id}`).then(res => props.removeTask(res.data)).catch(err => console.log(err))
        } 
        return <li key = {index}>
            <div style = {{display : 'flex'}}>
                
               <CheckIcon className = {tasks.isComplete ? 'isComplete' : 'checkicon'}/>
               <p className = {tasks.isComplete ? 'taskcomplete' : ''} onClick = {() => {
                   taskComplete(tasks)
               }}>{tasks.task}</p>
            </div>
            <div>
                <EditIcon className = 'edit' onClick = {() => {
                    props.tasktoUpdate(tasks)
                    props.showPopup()
                }}/>
                <CloseIcon className = 'close' onClick = {() => {
                    removeTask(tasks._id)
                }}/>
            </div>
        </li>
    })
    return (
        <div className = 'tasklist'>
            <ul>
                {todolist}
            </ul>
        </div>
    )
}

export default TodoList
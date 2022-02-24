import React , {useState , useEffect} from 'react'
import axios from 'axios'
import './App.css'
import AddTask from './Component/AddTask'
import TodoList from './Component/TodoList'
import UpdateTask from './Component/UpdateTask'
function App() {
  const [todolist,setTodolist] = useState([])
  const [tasktoUpdate , setTasktoUpdate] = useState({})
  const [showPopup,setShowPopup] = useState(false)
  useEffect(() => {
    axios.get('https://my-todo-app-node.herokuapp.com/task').then(res => {
      setTodolist(res.data)
    }).catch(err => console.log(err))
  },[])
  const addTask = newTask => {
    setTodolist([...todolist,newTask])
  }
  const taskComplete = task => {
    const newList = [...todolist]
    newList.forEach(item => {
      if(item._id === task._id){
        item.isComplete = task.isComplete
      }
    })
    setTodolist(newList)
  }
  const removeTask = task => {
    const newList = todolist.filter(item => !(item._id === task._id))
    setTodolist(newList)
  }
  const updatetask = tasks => {
    const newList = [...todolist]
    newList.forEach(item => {
      if(item._id === tasks._id){
        item.task = tasks.task
      }
    })
    setTodolist(newList)
  }
  return (
    <div>
      <AddTask addTask = {addTask}/>
      <TodoList todolist = {todolist} taskComplete = {taskComplete} removeTask = {removeTask} tasktoUpdate = {task => setTasktoUpdate(task)} showPopup = {() => setShowPopup(!showPopup)}/>
      {showPopup && <UpdateTask task = {tasktoUpdate} updatetask = {updatetask} removePopup = {() => setShowPopup(!showPopup)}/>}
    </div>
  )
}

export default App
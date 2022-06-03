import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4} from 'uuid';
//"npm i uuid" or "npm i uuidv4" in terminal to download uuid

//const [todos, setTodos] = useState([{ id: 1, name: 'Todo 1', complete: false}])
//the above was for testing purposes
// {} is for calling a function, '' is for stuff

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //storing
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])  

  //getting todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  //"we always want to make sure we make a copy"
  //"in react you should never directly modify a variable"
  //"you should always create a copy before modifying it and then"
  //"use that new copy to set the new state"

  function handleAddTodo(e) {
    //e for event property
    const name = todoNameRef.current.value
    if (name === '') return
    //console.log(name) for testing
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
    //null for quality of life
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.complete).length} Left to do</div>
    </>
  )
}

export default App;

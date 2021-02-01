import React, { useState,useRef,useEffect} from 'react';
import TodoList from './TodoList'
// idの取得がうまくできていない？？

import uuidv4 from 'uuid/4'

const LOCAL_STORAGE_KEY ='todoApp.todos'

function App(){
  const [todos,setTodos]= useState([])
  const todoNameRef=useRef()

  useEffect(() =>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  },[])

useEffect(() =>{
  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
},[todos])


function toggleTodo(id){
  const newTodos= [...todos]
  const todo = newTodos.find(todo => todo.id===id)
  todo.complete= !todo.complete
  setTodos(newTodos)
}



  function handleAddtodo(e){
    const name = todoNameRef.current.value
    if (name ==='')return

    setTodos(previousTodos =>{
      return [...previousTodos,{id:uuidv4(), name:name, complete:false}]
    })
    // 入力した後の中身を空にします
    todoNameRef.current.value = null

  }


  return(
    <>
    {/* プロップス */}
    <TodoList todos={todos} toggleTodo={toggleTodo} /> 
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddtodo}>Add Todo</button>
    <button>Clear Completed Todos</button>
    <div>0 left to do</div>
    </>
  )
}

export default App;

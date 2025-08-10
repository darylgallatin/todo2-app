import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";

import { useState, useEffect } from 'react';
import { startBgMusic } from './components/bgMusic'; 


function App() {
  // Main todos state with a default todo.
  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', complete: true }
  ]);
  // State to manage which tab is selected.
  const [selectedTab, setSelectedTab] = useState('Open');

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, complete: false }];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleCompleteTodo(index) {
    // Create a copy of the todos, mark the selected todo as complete.
    let newTodoList = [...todos];
    let completedTodo = todos[index];
    completedTodo['complete'] = true;
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  // New function to update an existing todo's text.
  function handleUpdateTodo(index, newInput) {
    let newTodoList = [...todos];
    newTodoList[index].input = newInput;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => valIndex !== index);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  // Helper to save todos to localStorage.
  function handleSaveData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }));
  }

  // On mount, load any saved todos from localStorage.
  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) { return; }
    let db = JSON.parse(localStorage.getItem('todo-app'));
    setTodos(db.todos);
  }, []);
  // Global click listener to start background music on first click anywhere.
  useEffect(() => {
    const handleScreenClick = () => {
      startBgMusic();
      // Remove the listener after the first click.
      document.removeEventListener('click', handleScreenClick);
    };
    document.addEventListener('click', handleScreenClick);
    return () => {
      document.removeEventListener('click', handleScreenClick);
    };
  }, []);

  return (
    <>
      <Header todos={todos} />
      <Tabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        todos={todos}
      />
      <TodoList
        handleCompleteTodo={handleCompleteTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
        selectedTab={selectedTab}
        todos={todos}
      />
      <TodoInput handleAddTodo={handleAddTodo} />
    </>
  );
}

export default App;

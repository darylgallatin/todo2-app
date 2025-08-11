import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { useState, useEffect } from 'react';
import { startBgMusic } from './components/bgMusic';

function App() {
  // Main list of todos (default with one welcome task)
  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', complete: true }
  ]);

  // Current selected filter tab: 'Open', 'Completed', or 'All'
  const [selectedTab, setSelectedTab] = useState('Open');

  // Add a new todo
  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, complete: false }];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  // Mark a todo complete
  function handleCompleteTodo(index) {
    const newTodoList = [...todos];
    newTodoList[index].complete = true;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  // Update text of an existing todo
  function handleUpdateTodo(index, newInput) {
    const newTodoList = [...todos];
    newTodoList[index].input = newInput;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  // Delete a todo by index
  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_, i) => i !== index);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  // NEW: remove all completed todos
  function handleClearCompleted() {
    const keep = todos.filter(t => !t.complete);
    setTodos(keep);
    handleSaveData(keep);
  }

  // Persist to localStorage
  function handleSaveData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }));
  }

  // Load from localStorage on first mount
  useEffect(() => {
    const raw = localStorage.getItem('todo-app');
    if (raw) {
      try {
        const db = JSON.parse(raw);
        if (Array.isArray(db?.todos)) setTodos(db.todos);
      } catch (_) { /* ignore parse errors */ }
    }
  }, []);

  // Start background music after first click (browser policy)
  useEffect(() => {
    const handleScreenClick = () => {
      startBgMusic();
      document.removeEventListener('click', handleScreenClick);
    };
    document.addEventListener('click', handleScreenClick);
    return () => document.removeEventListener('click', handleScreenClick);
  }, []);

  return (
    <>
      {/* Header + Clear Completed action */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <Header todos={todos} />
        <button
          onClick={handleClearCompleted}
          aria-label="Clear completed todos"
          className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300"
          disabled={!todos.some(t => t.complete)}
          title="Remove all completed tasks"
        >
          Clear Completed
        </button>
      </div>

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

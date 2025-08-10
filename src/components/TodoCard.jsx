import { useState, useRef, useEffect } from 'react';
// Import sound files
import doneSound from './menu_accept.ogg';
import editSound from './menu_change.ogg';
import deleteSound from './menu_cancel.ogg';

export function TodoCard(props) {
  // Destructure props
  const { todo, handleDeleteTodo, todoIndex, handleCompleteTodo, handleUpdateTodo } = props;
  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedInput, setEditedInput] = useState(todo.input);
  const inputRef = useRef(null);

  // Auto-focus when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Play sound helper functions
  const playDoneSound = () => {
    new Audio(doneSound).play();
  };

  const playEditSound = () => {
    new Audio(editSound).play();
  };

  const playDeleteSound = () => {
    new Audio(deleteSound).play();
  };

  // Save the edit and exit edit mode
  const saveEdit = () => {
    if (editedInput !== todo.input) {
      handleUpdateTodo(todoIndex, editedInput);
    }
    setIsEditing(false);
  };

  return (
    <div className="card todo-item">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editedInput}
          onChange={(e) => setEditedInput(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); }}
        />
      ) : (
        <p>{todo.input}</p>
      )}
      <div className="todo-buttons">
        <button 
          onClick={() => {
            playDoneSound(); // Play sound before completing
            handleCompleteTodo(todoIndex);
          }}
          disabled={todo.complete}>
          <h6>Done</h6>
        </button>
        <button 
          onClick={() => {
            playEditSound(); // Play sound when editing starts
            setEditedInput(todo.input);
            setIsEditing(true);
          }}>
          <h6>Edit</h6>
        </button>
        <button 
          onClick={() => {
            playDeleteSound(); // Play sound when deleting
            handleDeleteTodo(todoIndex);
          }}>
          <h6>Delete</h6>
        </button>
      </div>
    </div>
  );
}

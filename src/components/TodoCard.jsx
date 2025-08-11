// TodoCard.jsx
// Renders a single todo with Done / Edit / Delete actions + small UX sounds
import { useState, useRef, useEffect } from 'react';
import doneSound from './menu_accept.ogg';
import editSound from './menu_change.ogg';
import deleteSound from './menu_cancel.ogg';

export function TodoCard({ todo, todoIndex, handleCompleteTodo, handleUpdateTodo, handleDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInput, setEditedInput] = useState(todo.input);
  const inputRef = useRef(null);

  // Auto-focus when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const play = (src) => new Audio(src).play();

  // Save edits (Enter/blur), cancel with Esc
  const saveEdit = () => {
    const trimmed = editedInput.trim();
    if (trimmed && trimmed !== todo.input) {
      handleUpdateTodo(todoIndex, trimmed);
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') setIsEditing(false);
          }}
          aria-label="Edit todo text"
        />
      ) : (
        <p>{todo.input}</p>
      )}

      <div className="todo-buttons">
        <button
          aria-label={todo.complete ? "Todo already completed" : "Mark todo as done"}
          onClick={() => { play(doneSound); handleCompleteTodo(todoIndex); }}
          disabled={todo.complete}
          title={todo.complete ? "Completed" : "Mark as done"}
        >
          <h6>Done</h6>
        </button>

        <button
          aria-label="Edit todo"
          onClick={() => { play(editSound); setEditedInput(todo.input); setIsEditing(true); }}
          title="Edit"
        >
          <h6>Edit</h6>
        </button>

        <button
          aria-label="Delete todo"
          onClick={() => { play(deleteSound); handleDeleteTodo(todoIndex); }}
          title="Delete"
        >
          <h6>Delete</h6>
        </button>
      </div>
    </div>
  );
}

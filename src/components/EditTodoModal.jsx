// EditTodoModal.jsx
// Small modal for editing a todo; parent controls visibility
import { useState } from 'react';

export function EditTodoModal({ currentTodo, onSave, onCancel }) {
  const [value, setValue] = useState(currentTodo);

  return (
    <div className="modal">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSave(value.trim());
          if (e.key === 'Escape') onCancel();
        }}
      />
      <button onClick={() => onSave(value.trim())}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

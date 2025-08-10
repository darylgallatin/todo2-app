export  function EditTodoModal({ currentTodo, onSave, onCancel }) {
    const [value, setValue] = useState(currentTodo);
    
    return (
      <div className="modal">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => onSave(value)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  }
  
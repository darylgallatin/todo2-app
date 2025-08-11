// TodoInput.jsx
// Controlled input + add button (plays a small sound when adding)
import { useState, useRef, useEffect } from 'react';
import addSound from './Item Pickup.mp3';

export function TodoInput({ handleAddTodo }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Focus the input on mount
  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, []);

  const play = (src) => new Audio(src).play();

  const add = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    play(addSound);
    handleAddTodo(trimmed);
    setInputValue('');
  };

  return (
    <div className="input-container">
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add task"
        onKeyDown={(e) => { if (e.key === 'Enter') add(); }}
      />
      <button onClick={add}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';

import addSound from './Item Pickup.mp3';


export function TodoInput({ handleAddTodo }) {
  // Use local state to track input for new todos.
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  // Helper function to play the add sound.
  const playAddSound = () => {
    new Audio(addSound).play();
  };

  return (
    <div className="input-container">
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
         
          setInputValue(e.target.value);
        }}
        placeholder="Add task"
      />
      <button onClick={() => {
        if (!inputValue) { return; }
        playAddSound();
        handleAddTodo(inputValue);
        
        setInputValue(''); // Clear input after adding
      }}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

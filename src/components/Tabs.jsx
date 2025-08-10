import { useEffect } from 'react';
import tabAllSound from './MENU A_Select.wav';
import tabOpenSound from './MENU B_Back.wav';
import tabCompletedSound from './MESSAGE-B_Accept.wav';



export function Tabs(props) {
  // Destructure todos, selectedTab, and setSelectedTab from props.
  const { todos, selectedTab, setSelectedTab } = props;
  // Define the available tab names.
  const tabs = ["All", "Open", "Completed"];

  // Function to play a specific sound based on the tab name.
  const playTabSound = (tab) => {
    let sound;
    switch (tab) {
      case "All":
        sound = new Audio(tabAllSound);
        break;
      case "Open":
        sound = new Audio(tabOpenSound);
        break;
      case "Completed":
        sound = new Audio(tabCompletedSound);
        break;
      default:
        break;
    }
    if (sound) sound.play();
  };

  return (
    <nav className="tab-container">
      {tabs.map((tab, tabIndex) => {
        // Determine the number of tasks for each tab based on the tab type.
        const numOfTasks = tab === 'All'
          ? todos.length
          : tab === 'Completed'
            ? todos.filter(val => val.complete).length
            : todos.filter(val => !val.complete).length;

        return (
          <button
            key={tabIndex}
            className={"tab-button " + (tab === selectedTab ? ' tab-selected' : ' ')}
            onClick={() => {
              playTabSound(tab); // Play the sound for this tab.
              setSelectedTab(tab); // Then update the selected tab.
            }}
          >
            <h4>{tab} <span>({numOfTasks})</span></h4>
          </button>
        );
      })}
      <hr />
    </nav>
  );
}

  
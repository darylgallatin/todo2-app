// Tabs.jsx
// Simple tabbed filter control: All | Open | Completed
import tabAllSound from './MENU A_Select.wav';
import tabOpenSound from './MENU B_Back.wav';
import tabCompletedSound from './MESSAGE-B_Accept.wav';

export function Tabs({ todos, selectedTab, setSelectedTab }) {
  const tabs = ["All", "Open", "Completed"];

  // Play a short UI sound based on the tab selected
  const playTabSound = (tab) => {
    let src =
      tab === "All" ? tabAllSound :
      tab === "Open" ? tabOpenSound :
      tabCompletedSound;

    new Audio(src).play();
  };

  return (
    <nav className="tab-container">
      {tabs.map((tab) => {
        // Count items for each tab
        const count = tab === "All"
          ? todos.length
          : tab === "Completed"
            ? todos.filter(t => t.complete).length
            : todos.filter(t => !t.complete).length;

        return (
          <button
            key={tab}
            className={"tab-button" + (tab === selectedTab ? " tab-selected" : "")}
            onClick={() => { playTabSound(tab); setSelectedTab(tab); }}
          >
            <h4>{tab} <span>({count})</span></h4>
          </button>
        );
      })}
      <hr />
    </nav>
  );
}

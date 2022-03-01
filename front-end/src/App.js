import './App.css';
import upArrow from './upArrow.svg';
import downArrow from './downArrow.svg';

function App() {
  return (
    <div className="App">
      <h1>Todo</h1>
      <div className="input-container">
        <input className="add-task-input" type="text" placeholder="I want to..." />
      </div>
      <div className="control-container">
        <div className="control-buttons">
          <button className="control-button-selected">All</button>
          <button>Done</button>
          <button>Undone</button>
        </div>
        <div className="sort-buttons">
          <p>Sort by Date</p>
          <img src={upArrow} className="icon"/>
          <img src={downArrow} className="icon icon-up"/>
        </div>
      </div>
    </div>
  );
}

export default App;

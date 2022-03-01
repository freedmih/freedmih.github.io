import './App.css';
import upArrow from './upArrow.svg';
import downArrow from './downArrow.svg';

import Task from "./components/Task";

import { useState } from "react";

function App() {

  const [tasks, setTasks] = useState([]);

  const [titleTask, setTitleTask] = useState('');

  const removeTask = taskId => {

    console.log(tasks, taskId);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }

  const addTask = event => {

    if(titleTask.trim() === "") return;

    if(event.key === "Enter") {
      setTasks(
        [
          ...tasks,
          { id: tasks.length, title: titleTask, deleteCallback: removeTask }
        ]
      );

      setTitleTask('');
    }
  }

  return (
    <div className="App">
      <h1>Todo</h1>
      <div className="input-container">
        <input className="add-task-input" type="text" placeholder="I want to..." value={titleTask} onKeyDown={addTask} onChange={e => setTitleTask(e.target.value)}/>
      </div>
      <div className="control-container">
        <div className="control-buttons">
          <button className="control-button-selected">All</button>
          <button>Done</button>
          <button>Undone</button>
        </div>
        <div className="sort-buttons">
          <p>Sort by Date</p>
          <img src={upArrow} className="icon" alt="Sort by up date"/>
          <img src={downArrow} className="icon icon-up" alt="Sort by down date"/>
        </div>
      </div>
      <div className="Tasks">
        {
          tasks.map(task => <Task key={task.id} id={task.id} title={task.title} date={task.date} deleteCallback={removeTask} />)
        }
      </div>
    </div>
  );
}

export default App;

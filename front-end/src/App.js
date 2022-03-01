import './App.css';
import upArrow from './upArrow.svg';
import downArrow from './downArrow.svg';

import Task from "./components/Task";

import { useEffect, useState } from "react";

function App() {

  const [tasks, setTasks] = useState([]);

  const [titleTask, setTitleTask] = useState('');

  const removeTask = taskId => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }

  useEffect(() => {
    setTasks(Array.from(Array(10).keys()).map(x => ({
      id: x,
      title: `RANDOM${x}`,
      date: `${new Date().getDay()+x}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      deleteCallback: removeTask
    })));
  }, []);

  const addTask = event => {

    if(titleTask.trim() === "") return;

    if(event.key === "Enter") {

      let date = new Date();
      let dateStr = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`

      setTasks(
        [
          ...tasks,
          { id: tasks.length, title: titleTask, deleteCallback: removeTask, date: dateStr }
        ]
      );

      setTitleTask('');
    }
  }

  const sortTasksUp = () => {
    setTasks(prevTasks => prevTasks.sort((a, b) => b.id - a.id))
  }

  const sortTasksDown = () => {
    setTasks(prevTasks => prevTasks.sort((a, b) => a.id - b.id))
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
          <button onClick={() => sortTasksUp()}><img src={upArrow} className="icon" alt="Sort by down date"/></button>
          <button onClick={() => sortTasksDown()}><img src={downArrow} className="icon icon-up" alt="Sort by up date"/></button>
        </div>
      </div>
      <div className="Tasks">
        {
          tasks.slice(0, 10).map(task => <Task key={task.id} id={task.id} title={task.title} date={task.date} deleteCallback={removeTask} />)
        }
      </div>
    </div>
  );
}

export default App;

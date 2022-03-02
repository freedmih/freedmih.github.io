import './App.css';

import TaskList from "./components/TaskList";

import useTaskState from "./hooks/useTaskState";

import { useEffect, useState } from "react";
import SortButtons from './components/SortButtons';

function App() {

  const [titleTask, setTitleTask] = useState('');

  const { 
    todos, 
    addTodo, 
    deleteTodo, 
    sortByDateUp, 
    sortByDateDown, 
    changeStatus
   } = useTaskState([]);

  const addTask = event => {

    if (titleTask.trim() === "") return;

    if (event.key === "Enter") {
      addTodo({
        title: titleTask,
        date: new Date().getTime(),
        isDone: false
      });
      setTitleTask('');
    }
  }

  return (
    <div className="App">
      <h1>Todo</h1>
      <div className="input-container">
        <input className="add-task-input" type="text" placeholder="I want to..." onKeyDown={addTask} value={titleTask} onChange={e => setTitleTask(e.target.value)} />
      </div>
      <div className="control-container">
        <div className="control-buttons">
          <button className="control-button control-button-selected">All</button>
          <button className="control-button">Done</button>
          <button className="control-button">Undone</button>
        </div>
        <SortButtons sortUp={sortByDateUp} sortDown={sortByDateDown} />
      </div>
      <TaskList tasks={todos} deleteTask={deleteTodo} changeStatus={changeStatus} />
    </div>
  );
}

export default App;

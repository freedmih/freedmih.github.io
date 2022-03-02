import './App.css';

import TaskList from "./components/TaskList";

import useTaskState from "./hooks/useTaskState";

import { useEffect, useState } from "react";
import SortButtons from './components/SortButtons';

function App() {

  //const [tasks, setTasks] = useState([]);

  const [titleTask, setTitleTask] = useState('');

  const { todos, addTodo, deleteTodo, sortByDateUp, sortByDateDown } = useTaskState([]);

  const addTask = event => {

    if (titleTask.trim() === "") return;

    if (event.key === "Enter") {
      addTodo({
        title: titleTask,
        date: new Date().getTime()
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
          <button className="control-button-selected">All</button>
          <button>Done</button>
          <button>Undone</button>
        </div>
        <SortButtons sortUp={sortByDateUp} sortDown={sortByDateDown}/>
      </div>
      <TaskList tasks={todos} deleteTask={deleteTodo} />
    </div>
  );
}

export default App;

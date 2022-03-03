import './App.css';

import TaskList from "./components/TaskList";

import useTaskState from "./hooks/useTaskState";

import { useState } from "react";
import SortButtons from './components/SortButtons';
import Pagination from './components/Pagination';

function App() {

  const [titleTask, setTitleTask] = useState('');
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState(0);
  const [page, setPage] = useState(0);

  const {
    todos,
    addTodo,
    deleteTodo,
    sortByDateUp,
    sortByDateDown,
    changeStatus,
    saveTitle,
    getOnlyDoneTasks,
    getOnlyUnDoneTasks
  } = useTaskState([]);

  const addTask = event => {

    if (titleTask.trim() === "") return;

    if (event.key === "Enter") {
      setIndex(prevIndex => {
        addTodo({
          id: index,
          title: titleTask,
          date: new Date().getTime(),
          isDone: false
        });
        return ++prevIndex;
      })
      setTitleTask('');
    }
  }

  const changeFilter = current => {
    setPage(0);
    setFilter(current);
  }

  
  const filteredTasks = () => {
    switch(filter) {
      case 0:
        return todos;
        case 1:
          return getOnlyDoneTasks();
        case 2:
          return getOnlyUnDoneTasks();
    }
  } 

  //const footer = todos.length > 5 ? <Pagination activePage={activePage}/> : <></>
  const footer = filteredTasks().length > 5 ? <Pagination count={filteredTasks().length} activePage={page} setActivePage={setPage}/> : <></>

  return (
    <div className="App">
      <h1>Todo</h1>
      <div className="input-container">
        <input className="add-task-input" type="text" placeholder="I want to..." onKeyDown={addTask} value={titleTask} onChange={e => setTitleTask(e.target.value)} />
      </div>
      <div className="control-container">
        <div className="control-buttons">
          <button className={filter === 0 ? "control-button control-button-selected" : "control-button"} onClick={() => changeFilter(0)}>All</button>
          <button className={filter === 1 ? "control-button control-button-selected" : "control-button"} onClick={() => changeFilter(1)}>Done</button>
          <button className={filter === 2 ? "control-button control-button-selected" : "control-button"} onClick={() => changeFilter(2)}>Undone</button>
        </div>
        <SortButtons sortUp={sortByDateUp} sortDown={sortByDateDown} />
      </div>  
      <TaskList tasks={todos} deleteTask={deleteTodo} changeStatus={changeStatus} filter={filter} page={page} saveTitle={saveTitle} tasks2={filteredTasks()}/>
      {footer}
    </div>
  );
}

export default App;

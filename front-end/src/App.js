import './App.css';

import TaskList from "./components/TaskList";

import useTaskState from "./hooks/useTaskState";

import React from "react";
import { useState, useContext } from "react";
import SortButtons from './components/SortButtons';
import Pagination from './components/Pagination';

import { AppContext } from "./Context";
import FilterButtons from './components/FilterButtons';
import FormInput from './components/FormInput';

function App() {

  const Context = useContext(AppContext);

  //const [titleTask, setTitleTask] = useState('');
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState(Context.FILTER_ALL);
  const [page, setPage] = useState(Context.FIRST_PAGE_INDEX);

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

  const addTask = titleTask => {

    if (titleTask.trim().length <= 0) return false;

    setIndex(prevIndex => {
      addTodo({
        id: index,
        title: titleTask,
        date: new Date().getTime(),
        isDone: false
      });
      return ++prevIndex;
    })
    
    return true;
  }

  const changeFilter = current => {
    setPage(Context.FIRST_PAGE_INDEX);
    setFilter(current);
  }

  const filteredTasks = () => {
    switch (filter) {
      case Context.FILTER_ALL:
        return todos;
      case Context.FILTER_DONE:
        return getOnlyDoneTasks();
      case Context.FILTER_UNDONE:
        return getOnlyUnDoneTasks();
      default:
        return todos;
    }
  }

  const footer = filteredTasks().length > Context.MAX_TASKS_PER_PAGE ? <Pagination count={filteredTasks().length} activePage={page} setActivePage={setPage} /> : <></>

  return (
    <div className="App">
      <h1>Todo</h1>
      <FormInput addTask={addTask} />
      {/*       <div className="input-container">
        <input className="add-task-input" type="text" placeholder="I want to..." onKeyDown={addTask} value={titleTask} onChange={e => setTitleTask(e.target.value)} />
      </div> */}
      <div className="control-container">
        <FilterButtons filter={filter} changeFilter={changeFilter} />
        <SortButtons sortUp={sortByDateUp} sortDown={sortByDateDown} />
      </div>
      <TaskList deleteTask={deleteTodo} changeStatus={changeStatus} filter={filter} page={page} saveTitle={saveTitle} tasks={filteredTasks()} />
      {footer}
    </div>
  );
}

export default App;

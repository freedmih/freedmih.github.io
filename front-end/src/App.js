import './App.css';

import TaskList from "./components/TaskList";

import useTaskState from "./hooks/useTaskState";

import React from "react";
import { useState } from "react";
import SortButtons from './components/SortButtons';
import Pagination from './components/Pagination';

import { Constants } from "./constants";
import FilterButtons from './components/FilterButtons';
import FormInput from './components/FormInput';
import { GetIntDateNow } from './utils/date';

import { message, Button, Space } from 'antd';

const error = text => {
    message.error(text);
};

function App() {

  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState(Constants.FILTER_ALL);
  const [page, setPage] = useState(Constants.FIRST_PAGE_INDEX);

  const {
    todos,
    addTodo,
    deleteTodo,
    sortByDate,
    changeStatus,
    saveTitle,
    getOnlyDoneTasks,
    getOnlyUnDoneTasks,
    isValidTitle
  } = useTaskState([]);


  const addTask = titleTask => {

    const validResult = isValidTitle(titleTask);

    if (!validResult.result) {
      error(validResult.message);
      return false;
    }

    setIndex(prevIndex => {
      addTodo({
        id: index,
        title: titleTask,
        date: GetIntDateNow(),
        isDone: false
      });
      return ++prevIndex;
    })

    return true;
  }

  const changeFilter = current => {
    setPage(Constants.FIRST_PAGE_INDEX);
    setFilter(current);
  }

  const filteredTasks = () => {
    switch (filter) {
      case Constants.FILTER_ALL:
        return todos;
      case Constants.FILTER_DONE:
        return getOnlyDoneTasks();
      case Constants.FILTER_UNDONE:
        return getOnlyUnDoneTasks();
      default:
        return todos;
    }
  }

  const getTasksByPage = page => {
    return filteredTasks().slice(page * Constants.MAX_TASKS_PER_PAGE, page * Constants.MAX_TASKS_PER_PAGE + Constants.MAX_TASKS_PER_PAGE);
  }

  const footer = filteredTasks().length > Constants.MAX_TASKS_PER_PAGE ? <Pagination count={filteredTasks().length} activePage={page} setActivePage={setPage} /> : <></>

  const isEmptyPage = () => {
    const countOfTasks = filteredTasks().slice(page * Constants.MAX_TASKS_PER_PAGE, page * Constants.MAX_TASKS_PER_PAGE + Constants.MAX_TASKS_PER_PAGE).length;
    if (countOfTasks === 0 && page > 0) {
      return true;
    }
    return false;
  }

  if (isEmptyPage()) {
    setPage(page => page - 1);
  }

  return (
    <div className="App">
      <h1>Todo</h1>
      <FormInput addTask={addTask} />
      <div className="control-container">
        <FilterButtons filter={filter} changeFilter={changeFilter} />
        <SortButtons sortByDate={sortByDate} />
      </div>
      <TaskList isValidTitle={isValidTitle} deleteTask={deleteTodo} changeStatus={changeStatus} saveTitle={saveTitle} tasks={getTasksByPage(page)} />
      {footer}
    </div>
  );
}

export default App;

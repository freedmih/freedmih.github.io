import './App.css';

import TaskList from "./components/TaskList";

import useTaskState from "./hooks/useTaskState";

import React, { useEffect } from "react";
import { useState } from "react";
import SortButtons from './components/SortButtons';
import Pagination from './components/Pagination';

import { Constants } from "./constants";
import FilterButtons from './components/FilterButtons';
import FormInput from './components/FormInput';
import { GetIntDateNow } from './utils/date';

import { message } from 'antd';

import API from './api/api';

import { USER_ID } from './api/constants';

const error = text => {
  message.error(text);
};

function App() {

  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState(Constants.FILTER_ALL);
  const [page, setPage] = useState(Constants.FIRST_PAGE_INDEX);
  const [sortType, setSortType] = useState(Constants.DATE_FILTER_DIRECTION_DOWN);

  const [limitedTasks, setLimitedTasks] = useState([]);

  const {
    todos,
    addTodo,
    deleteTodo,
    sortByDate,
    updateTodo,
    getOnlyDoneTasks,
    getOnlyUnDoneTasks,
    isValidTitle,
    loadTodos
  } = useTaskState([]);

  useEffect(() => {
    API.get(`tasks/${USER_ID}`)
    .then(res => {
      const todos = res.data;
      loadTodos(todos.tasks);
    });
  }, []);

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

  const getTasksByPage = (page) => {
    return limitedTasks.slice(page * Constants.MAX_TASKS_PER_PAGE, page * Constants.MAX_TASKS_PER_PAGE + Constants.MAX_TASKS_PER_PAGE);
  }

  useEffect(() => sortByDate(sortType), [sortType]);

  useEffect(() => {
    setPage(Constants.FIRST_PAGE_INDEX);
    setLimitedTasks(filteredTasks());
  }, [filter]);

  useEffect(() => {
    setLimitedTasks(filteredTasks());
  }, [todos]);

  const isEmptyPage = () => {
    const countOfTasks = limitedTasks.slice(page * Constants.MAX_TASKS_PER_PAGE, page * Constants.MAX_TASKS_PER_PAGE + Constants.MAX_TASKS_PER_PAGE).length;

    if (countOfTasks === 0 && page > 0) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (isEmptyPage()) {
      setPage(page => page - 1);
    }
  }, [limitedTasks]);

  const addTask = titleTask => {
    const validResult = isValidTitle(titleTask);

    if (!validResult.result) {
      error(validResult.message);
      return false;
    }

    return API.post(`task/${USER_ID}`, {
      name: titleTask,
      done: false
    })
    .then(res => {
      return true;
    })
    .catch(err => {
      error(err.response.data.message);
      return false;
    });

/*     setIndex(prevIndex => {
      addTodo({
        id: index,
        title: titleTask,
        date: GetIntDateNow(),
        isDone: false
      });
      return ++prevIndex;
    }) */
  }

  const deleteTask = uuid => {
    let isDeleted = false;
    API.delete(`task/${USER_ID}/${uuid}`)
    .then(res => {
      isDeleted = true;
    })
    .catch(err => {
      if(err.response.status == 404) {
        error(Constants.ERROR_NON_EXIST_TASK);
      }
    })

    return isDeleted;
  }

  const footer = limitedTasks.length > Constants.MAX_TASKS_PER_PAGE ? <Pagination count={limitedTasks.length} activePage={page} setActivePage={setPage} /> : <></>

  return (
    <div className="App">
      <h1>Todo</h1>
      <FormInput addTask={addTask} />
      <div className="control-container">
        <FilterButtons filter={filter} setFilter={setFilter} />
        <SortButtons setSortType={setSortType} />
      </div>
      <TaskList isValidTitle={isValidTitle} deleteTask={deleteTask} updateTodo={updateTodo} tasks={getTasksByPage(page)} />
      {footer}
    </div>
  );
}

export default App;

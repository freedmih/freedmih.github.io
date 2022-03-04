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

import { Spin } from 'antd';

const error = text => {
  message.error(text);
};

function App() {

  const [filterBy, setFilterBy] = useState(Constants.FILTER_ALL);
  const [page, setPage] = useState(Constants.FIRST_PAGE_INDEX);
  const [order, setOrder] = useState(Constants.DATE_FILTER_DIRECTION_UP);
  const [count, setCount] = useState(0);

  const [isLoading, setLoading] = useState(false);

  const {
    todos,
    isValidTitle,
    loadTodos
  } = useTaskState([]);

  async function getTasks() {
    setLoading(true);
    await API.get(`tasks/${USER_ID}`, {
      params: {
        page,
        filterBy,
        order,
        pp: Constants.MAX_TASKS_PER_PAGE
      }
    })
      .then(res => {
        const todos = res.data;
        if (todos.tasks.length === 0 && page > 1) {
          setCount(todos.count);
          setPage(page - 1);
          setLoading(false);
          return;
        }
        loadTodos(todos.tasks);
        setCount(todos.count);
        setLoading(false);
      });
  }

  useEffect(() => {
    getTasks();
  }, [page, filterBy, order]);

  const addTask = async titleTask => {
    const validResult = isValidTitle(titleTask);

    if (!validResult.result) {
      error(validResult.message);
      return false;
    }

    return await API.post(`task/${USER_ID}`, {
      name: titleTask,
      done: false
    })
      .then(res => {
        if (res.status === 200) {
          getTasks();
        }
        return true;
      })
      .catch(err => {
        error(err.response.data.message);
        return false;
      });
  }

  const deleteTask = async uuid => {
    return await API.delete(`task/${USER_ID}/${uuid}`)
      .then(res => {
        if (res.status == 204) {
          getTasks();
          return true;
        }
      })
      .catch(err => {
        error(err.response.data.message);
        return false;
      });
  }

  const updateTask = async task => {
    console.log(task);
    return await API.patch(`task/${USER_ID}/${task.uuid}`, {
      ...task
    })
      .then(res => {
        if (res.status == 200) {
          getTasks();
          return true;
        }
      })
      .catch(err => {
        error(err.response.data.message);
        return false;
      });
  }

  const footer = count > Constants.MAX_TASKS_PER_PAGE ? <Pagination count={count} activePage={page} setActivePage={setPage} /> : <></>

  return (
    <div className="App">
      <h1>Todo</h1>
      <FormInput addTask={addTask} />
      <Spin spinning={isLoading}>
        <div style={{ minHeight: '600px' }}>
          <div className="control-container">
            <FilterButtons filter={filterBy} setFilter={setFilterBy} />
            <SortButtons setSortType={setOrder} />
          </div>
          <TaskList isValidTitle={isValidTitle} deleteTask={deleteTask} updateTask={updateTask} tasks={todos} />
          {footer}
        </div>
      </Spin>
    </div>
  );
}

export default App;

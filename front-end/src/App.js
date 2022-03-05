import './App.css';

import TaskList from "./components/TaskList";

import useTaskState from "./hooks/useTaskState";

import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import SortButtons from './components/SortButtons';

import { Constants } from "./constants";
import FilterButtons from './components/FilterButtons';
import FormInput from './components/FormInput';

import API from './api/api';

import { USER_ID } from './api/constants';

import { Typography, Pagination } from 'antd';

const { Title } = Typography;

function App() {

  const [filterBy, setFilterBy] = useState(Constants.FILTER_ALL);
  const [page, setPage] = useState(Constants.FIRST_PAGE_INDEX);
  const [order, setOrder] = useState(Constants.DATE_FILTER_DIRECTION_UP);
  const [count, setCount] = useState(0);

  const {
    todos,
    isValidTitle,
    loadTodos
  } = useTaskState([]);

  async function receiveTasks() {
    API.get(`tasks/${USER_ID}`, {
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
          return;
        }
        loadTodos(todos.tasks);
        setCount(todos.count);
      });
  }

  useEffect(() => {
    receiveTasks();
  }, [page, filterBy, order]);
  console.log(count);
  //let footer = count > Constants.MAX_TASKS_PER_PAGE ? <Pagination count={count} activePage={page} setActivePage={setPage} /> : <></>
  

  return (
    <div className="App">
      <Title level={2}>Todo</Title>
      <FormInput receiveTasks={receiveTasks} isValidTitle={isValidTitle}/>
      <div style={{ minHeight: '600px' }}>  
        <div className="control-container">
          <FilterButtons setFilter={setFilterBy} />
          <SortButtons setSortType={setOrder} />
        </div>
        <TaskList isValidTitle={isValidTitle} tasks={todos} receiveTasks={receiveTasks} />
        <Pagination pageSize={Constants.MAX_TASKS_PER_PAGE} current={page} onChange={page => setPage(page)} total={count} />
      </div>
    </div>
  );
}

export default App;

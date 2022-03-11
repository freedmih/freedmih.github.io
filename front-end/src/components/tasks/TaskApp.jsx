import TaskList from "./TaskList";

import useTaskState from "../../hooks/useTaskState";

import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import SortButtons from './SortButtons';

import { Constants } from "../../constants";
import FilterButtons from './FilterButtons';
import FormInput from './FormInput';
import { useHistory } from "react-router-dom";
import API from '../../api/api';

import { USER_ID } from '../../api/constants';

import { Typography, Pagination, Row, Col } from 'antd';

const { Title, Link } = Typography;

const redirectIfNotLogin = (history) => {
    const token = localStorage.getItem('jwt');

    if (!token) {
        history.push('/auth');
    }

    API.post('/validate', {}, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => {
            if (res.status !== 200) {
                history.push('/auth');
            }
        })
        .catch(err => {
            console.log(err);
            history.push('/auth');
        })
}

function TaskApp() {

    const [filterBy, setFilterBy] = useState(Constants.FILTER_ALL);
    const [page, setPage] = useState(Constants.FIRST_PAGE_INDEX);
    const [order, setOrder] = useState(Constants.DATE_FILTER_DIRECTION_UP);
    const [count, setCount] = useState(0);

    const history = useHistory();

    useEffect(() => {
        redirectIfNotLogin(history);
    }, []);
    const {
        todos,
        isValidTitle,
        loadTodos
    } = useTaskState([]);

    async function receiveTasks() {
        API.get(`tasks`, {
            params: {
                page,
                filterBy,
                order,
                pp: Constants.MAX_TASKS_PER_PAGE
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
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

    let footer = count > Constants.MAX_TASKS_PER_PAGE ? <Pagination pageSize={Constants.MAX_TASKS_PER_PAGE} current={page} onChange={page => setPage(page)} total={count} /> : <></>

    const logout = () => {
        localStorage.clear();
        history.push('/auth');
    }

    return (
        <div className="App">
            <Row align="middle" justify="center">
                <Col span={22}>
                    <Title level={2}>Todo</Title>
                </Col>
                <Col span={2}>
                    <Link onClick={() => logout()} target="_blank">
                        Logout
                    </Link>
                </Col>
            </Row>
            <FormInput receiveTasks={receiveTasks} isValidTitle={isValidTitle} />
            <div style={{ minHeight: '600px' }}>
                <div className="control-container">
                    <FilterButtons setFilter={setFilterBy} />
                    <SortButtons setSortType={setOrder} />
                </div>
                <TaskList isValidTitle={isValidTitle} tasks={todos} receiveTasks={receiveTasks} />
                {footer}
            </div>
        </div>
    );
}

export default TaskApp;

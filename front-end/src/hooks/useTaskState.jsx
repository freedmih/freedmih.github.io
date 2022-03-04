import { useState } from 'react';
import { Constants } from '../constants';

export default initialValue => {
    const [todos, setTodos] = useState(initialValue);

    return {
        todos,
        loadTodos: todos => {
            setTodos(todos);
        },
        addTodo: todoObject => {
            setTodos([...todos, todoObject]);
        },
        deleteTodo: todoIndex => {
            const newTodos = todos.filter((todo) => todo.uuid !== todoIndex);
            setTodos(newTodos);
        },
        sortByDate: direction => {
            if (direction === Constants.DATE_FILTER_DIRECTION_UP) {
                var newTodos = [...todos].sort((a, b) => b.createdAt - a.createdAt);
                setTodos(newTodos);
                return;
            }

            if (direction === Constants.DATE_FILTER_DIRECTION_DOWN) {
                var newTodos = [...todos].sort((a, b) => a.createdAt - b.createdAt);
                setTodos(newTodos);
            }
        },
        updateTodo: (todoIndex, todo = {}) => {
            const newTodos = [...todos];
            const idx = todos.findIndex(task => task.uuid === todoIndex);
            newTodos[idx] = { ...todos[idx], ...todo };
            setTodos(newTodos);
        },
        getOnlyDoneTasks: () => {
            return todos.filter(task => task.done);
        },
        getOnlyUnDoneTasks: () => {
            return todos.filter(task => !task.done);
        },
        isValidTitle: title => {
            if (title.trim().length === 0) {
                return {
                    result: false,
                    message: Constants.ERROR_EMPTY_TASK
                }
            }
            
            if (todos.findIndex(task => task.name === title) > -1) {
                return {
                    result: false,
                    message: Constants.ERROR_DUPLICATE_TASK
                }
            }

            return {
                result: true
            };
        }
    };
};
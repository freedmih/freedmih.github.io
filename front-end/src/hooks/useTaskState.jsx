import { useState } from 'react';
import { Constants } from '../constants';

export default initialValue => {
    const [todos, setTodos] = useState(initialValue);

    return {
        todos,
        addTodo: todoObject => {
            setTodos([...todos, todoObject]);
        },
        deleteTodo: todoIndex => {
            const newTodos = todos.filter((todo) => todo.id !== todoIndex);
            setTodos(newTodos);
        },
        sortByDate: direction => {
            if(direction === Constants.DATE_FILTER_DIRECTION_UP)
                var newTodos = [...todos].sort((a, b) => b.date - a.date);
            else
                var newTodos = [...todos].sort((a, b) => a.date - b.date);                
            
            setTodos(newTodos);
        },
        changeStatus: todoIndex => {
            const newTodos = [...todos];
            const idx = todos.findIndex(task => task.id === todoIndex);
            newTodos[idx].isDone = !newTodos[idx].isDone;
            setTodos(newTodos);
        },
        saveTitle: (todoIndex, newTitle) => {
            const newTodos = [...todos];
            const idx = todos.findIndex(task => task.id === todoIndex);
            newTodos[idx].title = newTitle;
            setTodos(newTodos);
        },
        getOnlyDoneTasks: () => {
            return todos.filter(task => task.isDone);
        },
        getOnlyUnDoneTasks: () => {
            return todos.filter(task => !task.isDone);
        }
    };
};
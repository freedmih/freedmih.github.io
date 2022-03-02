import { useState } from 'react';

export default initialValue => {
    const [todos, setTodos] = useState(initialValue);

    return {
        todos,
        addTodo: todoObject => {
            setTodos([...todos, todoObject]);
        },
        deleteTodo: todoIndex => {
            const newTodos = todos.filter((_, index) => index !== todoIndex);

            setTodos(newTodos);
        },
        sortByDateUp: () => {
            const newTodos = [...todos].sort((a ,b) => b.date - a.date);

            setTodos(newTodos);
        },
        sortByDateDown: () => {
            const newTodos = [...todos].sort((a ,b) => a.date - b.date);

            setTodos(newTodos);
        },
        changeStatus: todoIndex => {
            const newTodos = [...todos];
            newTodos[todoIndex].isDone = !newTodos[todoIndex].isDone;
            setTodos(newTodos);
        },
    };
};
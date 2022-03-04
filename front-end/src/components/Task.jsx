import { useState } from "react";
import { GetStringDateByTime } from "../utils/date";

import { message } from 'antd';

import API from './../api/api';

const GetMarkedTitle = (title, isDone) => isDone ? <s>{title}</s> : <>{title}</>

const error = text => {
    message.error(text);
};

export default function Task({ task, updateTodo, deleteTask, isValidTitle }) {
    const [editStatus, setEditStatus] = useState(false);
    const [editText, setEditText] = useState(task.name);

    const toggleEditMode = () => {
        setEditStatus(true);
    }

    const handleInput = event => {
        if (event.key === "Enter") {
            const validResult = isValidTitle(editText);

            if (!validResult.result) {
                error(validResult.message);
                return;
            }

            updateTodo(task.uuid, {
                name: editText
            });

            setEditStatus(false);
            
            return;
        } 
        
        if (event.key === "Escape") {
            setEditText(task.name);
            setEditStatus(false);
        }
    }

    const handleDelete = (e, uuid) => {
        e.stopPropagation();
        if(deleteTask(uuid)) {
            
        }
    }

    const details = editStatus ?
        <input onBlur={() => setEditStatus(false)} autoFocus type="text" className="edit-task-input" onKeyDown={e => handleInput(e)}
            value={editText} onChange={e => setEditText(e.target.value)} />
        : GetMarkedTitle(task.name, task.done)

    return (
        <div className="task" onClick={() => toggleEditMode()}>
            <div className="task-left">
                <input type="checkbox" className="btn-track" onClick={e => e.stopPropagation()} onChange={() => updateTodo(task.uuid, { done: !task.done })} checked={task.done} />
                {details}
            </div>
            <div className="task-right">
                {GetStringDateByTime(task.createdAt)}
                <button className="btn-delete-task" onClick={e => handleDelete(e, task.uuid)}>Delete</button>
            </div>
        </div>
    )
}
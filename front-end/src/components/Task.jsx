import { useState } from "react";
import { GetStringDateByTime } from "../utils/date";

import { Constants } from "../constants";

import { message, Button, Space } from 'antd';

const GetMarkedTitle = (title, isDone) => isDone ? <s>{title}</s> : <>{title}</>

const error = text => {
    message.error(text);
};

export default function Task({ task, saveTitle, changeStatus, deleteCallback, isValidTitle }) {
    const [editStatus, setEditStatus] = useState(false);
    const [editText, setEditText] = useState(task.title);

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

            saveTitle(task.id, editText);
            setEditStatus(false);
            
            return;
        } 
        
        if (event.key === "Escape") {
            setEditText(task.title);
            setEditStatus(false);
        }
    }

    const details = editStatus ?
        <input onBlur={() => setEditStatus(false)} autoFocus type="text" className="edit-task-input" onKeyDown={e => handleInput(e)}
            value={editText} onChange={e => setEditText(e.target.value)} />
        : GetMarkedTitle(task.title, task.isDone)

    return (
        <div className="task" onClick={() => toggleEditMode()}>
            <div className="task-left">
                <input type="checkbox" className="btn-track" onClick={e => e.stopPropagation()} onChange={(e) => changeStatus(task.id)} checked={task.isDone} />
                {details}
            </div>
            <div className="task-right">
                {GetStringDateByTime(task.date)}
                <button className="btn-delete-task" onClick={() => deleteCallback(task.id)}>Delete</button>
            </div>
        </div>
    )
}
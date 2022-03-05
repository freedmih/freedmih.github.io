import { useState } from "react";
import { GetStringDateByTime } from "../utils/date";

import { message } from 'antd';

import API from './../api/api';
import { Constants } from "../constants";
import { USER_ID } from "../api/constants";

const GetMarkedTitle = (title, isDone) => isDone ? <s>{title}</s> : <>{title}</>

const error = text => {
    message.error(text);
};

export default function Task({ task, isValidTitle, receiveTasks }) {
    const [editStatus, setEditStatus] = useState(false);
    const [editText, setEditText] = useState(task.name);
    const [loading, setLoading] = useState(false);

    const toggleEditMode = () => {
        setEditStatus(true);
    }

    const updateTask = async task => {
        try {
            await API.patch(`task/${USER_ID}/${task.uuid}`, {
                ...task
            })
            receiveTasks();
        }
        catch (e) {
            const errorMessage = e.response.data.message;
            error(errorMessage);
            setLoading(false);
        }
    }

    const handleInput = event => {
        if (event.key === "Enter") {
            const validResult = isValidTitle(editText);

            if (!validResult.result) {
                error(validResult.message);
                return;
            }

            updateTask({
                uuid: task.uuid,
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

    const removeTask = async uuid => {
        try {
            setLoading(true);
            await API.delete(`task/${USER_ID}/${uuid}`);
            receiveTasks();
        }
        catch (e) {
            const errorMessage = e.response.data.message;
            error(errorMessage);
            setLoading(false);
        }
    }

    const handleDelete = async (e, uuid) => {
        e.stopPropagation();
        setLoading(async () => {
            await removeTask(uuid);
            return true;
        });
    }

    const details = editStatus ?
        <input onBlur={() => setEditStatus(false)} autoFocus type="text" className="edit-task-input" onKeyDown={e => handleInput(e)}
            value={editText} onChange={e => setEditText(e.target.value)} disabled={loading}/>
        : GetMarkedTitle(task.name, task.done)

    return (
        <div className="task" onClick={() => toggleEditMode()}>
            <div className="task-left">
                <input type="checkbox" className="btn-track" onClick={e => e.stopPropagation()} onChange={() => updateTask({ uuid: task.uuid, done: !task.done })} checked={task.done} />
                {details}
            </div>
            <div className="task-right">
                {GetStringDateByTime(task.createdAt)}
                <button className="btn-delete-task" onClick={e => handleDelete(e, task.uuid)} disabled={loading}>Delete</button>
            </div>
        </div>
    )
}
import { useState } from "react";
import { GetStringDateByTime } from "../utils/date";

const GetMarkedTitle = (title, isDone) => isDone ? <s>{title}</s> : <p>{title}</p>

export default function Task( { task, saveTitle, changeStatus, deleteCallback }) {
    const [editStatus, setEditStatus] = useState(false);
    const [editText, setEditText] = useState(task.title);

    const toggleEditMode = () => {
        setEditStatus(true);
    }

    const handleInput = event => {
        if (event.key === "Enter") {
            saveTitle(task.id, editText);
            setEditStatus(false);
        } else if (event.key === "Escape") {
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
                {<p>{GetStringDateByTime(task.date)}</p>}
                <button className="btn-delete-task" onClick={() => deleteCallback(task.id)}>Delete</button>
            </div>
        </div>
    )
}
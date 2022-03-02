import { useState } from "react"; 

export default function Task(props) {
    const date = new Date(props.date);
    const dateStr = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

    const title = props.isDone ? <s>{props.title}</s> : <p>{props.title}</p>

    return (
        <div className="task">
            <div className="task-left">
                <input type="checkbox" className="btn-track" onClick={() => props.changeStatus(props.id)} checked={props.isDone}/>
                {title}
            </div>
            <div className="task-right">
                <p>{dateStr}</p>
                <button className="btn-delete-task" onClick={() => props.deleteCallback(props.id)}>Delete</button>
            </div>
        </div>
    )
}
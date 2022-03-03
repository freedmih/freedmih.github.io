import { useState } from "react"; 

export default function Task(props) {
    const date = new Date(props.date);
    const dateStr = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

    const title = props.isDone ? <s>{props.title}</s> : <p>{props.title}</p>

    const [ editStatus, setEditStatus ] = useState(false);
    const [ editText, setEditText ] = useState(props.title);

    const toggleEditMode = () => {
        setEditStatus(true);
    }

    const handleInput = event => {
        if(event.key == "Enter") {
            props.saveTitle(props.id, editText);
            setEditStatus(false);
        } else if(event.key == "Escape") {
            setEditText(props.title);
            setEditStatus(false);
        }
    }


    const details = editStatus ? <input onBlur={() => setEditStatus(false)} autoFocus type = "text" className="edit-task-input" onKeyDown={e => handleInput(e)} value={editText} onChange={e => setEditText(e.target.value)}/> : title

    return (
        <div className="task" onClick={() => toggleEditMode()}>
            <div className="task-left">
                <input type="checkbox" className="btn-track"  onClick={e => e.stopPropagation()} onChange={(e) => props.changeStatus(props.id)} checked={props.isDone}/>
                {details}
            </div>
            <div className="task-right">
                {<p>{dateStr}</p>}
                <button className="btn-delete-task" onClick={() => props.deleteCallback(props.id)}>Delete</button>
            </div>
        </div>
    )
}
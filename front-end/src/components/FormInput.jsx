import { useState, useContext } from "react";

import { AppSettings } from "../constants";

export default function FormInput({ addTask }) {
    const [titleTask, setTitleTask] = useState(AppSettings.EMPTY_STRING);

    const handleKeyDown = event => {
        if(event.key == 'Enter') {
            if(addTask(titleTask))
                setTitleTask(AppSettings.EMPTY_STRING);
        }
    }

    return (
        <div className="input-container">
            <input className="add-task-input" type="text" placeholder="I want to..." onKeyDown={e => handleKeyDown(e)} value={titleTask} onChange={e => setTitleTask(e.target.value)} />
        </div>
    )
}
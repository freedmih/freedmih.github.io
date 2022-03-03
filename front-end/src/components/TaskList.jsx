import Task from "./Task";
import { Constants } from "../constants";

export default function TaskList({ tasks, deleteTask, changeStatus, page, saveTitle }) {
    return (
        <div className="Tasks">
            {
                tasks.map(task =>
                <Task key={task.id} task={task} deleteCallback={deleteTask} changeStatus={changeStatus} saveTitle={saveTitle}
                    />)
            }
        </div>
    )
}
import Task from "./Task";
import { Constants } from "../constants";

export default function TaskList({ tasks, deleteTask, changeStatus, page, saveTitle }) {
    return (
        <div className="Tasks">
            {
                tasks.slice(page * Constants.MAX_TASKS_PER_PAGE, page * Constants.MAX_TASKS_PER_PAGE + Constants.MAX_TASKS_PER_PAGE).map(task =>
                <Task key={task.id} task={task} deleteCallback={deleteTask} changeStatus={changeStatus} saveTitle={saveTitle}
                    />)
            }
        </div>
    )
}
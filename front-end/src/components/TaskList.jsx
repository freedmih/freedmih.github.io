import Task from "./Task";
import { Constants } from "../constants";

export default function TaskList({ tasks, deleteTask, changeStatus, page, saveTitle }) {
    return (
        <div className="Tasks">
            {
                tasks.slice(page * Constants.MAX_TASKS_PER_PAGE, page * Constants.MAX_TASKS_PER_PAGE + Constants.MAX_TASKS_PER_PAGE).map(task =>
                <Task key={task.id} id={task.id} title={task.title} date={task.date} deleteCallback={deleteTask} changeStatus={changeStatus} isDone={task.isDone}
                    saveTitle={saveTitle}
                    />)
            }
        </div>
    )
}
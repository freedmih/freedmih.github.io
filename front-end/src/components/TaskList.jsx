import Task from "./Task";
import { useContext } from "react";
import { AppContext } from "../Context";

export default function TaskList({ tasks, deleteTask, changeStatus, page, saveTitle }) {

    const Context = useContext(AppContext);

    return (
        <div className="Tasks">
            {
                tasks.slice(page * Context.MAX_TASKS_PER_PAGE, page * Context.MAX_TASKS_PER_PAGE + Context.MAX_TASKS_PER_PAGE).map(task =>
                <Task key={task.id} id={task.id} title={task.title} date={task.date} deleteCallback={deleteTask} changeStatus={changeStatus} isDone={task.isDone}
                    saveTitle={saveTitle}
                    />)
            }
        </div>
    )
}
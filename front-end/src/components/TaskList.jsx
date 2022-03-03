import Task from "./Task";

export default function TaskList({ tasks, deleteTask, changeStatus, saveTitle, isValidTitle}) {
    return (
        <div className="Tasks">
            {
                tasks.map(task =>
                    <Task key={task.id} isValidTitle={isValidTitle} task={task} deleteCallback={deleteTask} changeStatus={changeStatus} saveTitle={saveTitle}/>)
            }
        </div>
    )
}
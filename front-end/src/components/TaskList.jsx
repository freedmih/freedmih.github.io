import Task from "./Task";

export default function TaskList({ tasks, deleteTask, updateTask, isValidTitle}) {
    return (
        <div className="Tasks">
            {
                tasks.map(task =>
                    <Task key={task.uuid} isValidTitle={isValidTitle} task={task} deleteTask={deleteTask} updateTask={updateTask}/>)
            }
        </div>
    )
}
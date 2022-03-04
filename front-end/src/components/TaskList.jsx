import Task from "./Task";

export default function TaskList({ tasks, deleteTask, updateTodo, isValidTitle}) {
    return (
        <div className="Tasks">
            {
                tasks.map(task =>
                    <Task key={task.uuid} isValidTitle={isValidTitle} task={task} deleteTask={deleteTask} updateTodo={updateTodo}/>)
            }
        </div>
    )
}
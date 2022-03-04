import Task from "./Task";

export default function TaskList({ tasks, deleteTask, updateTodo, isValidTitle}) {
    return (
        <div className="Tasks">
            {
                tasks.map(task =>
                    <Task key={task.id} isValidTitle={isValidTitle} task={task} deleteCallback={deleteTask} updateTodo={updateTodo}/>)
            }
        </div>
    )
}
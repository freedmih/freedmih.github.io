import Task from "./Task";

export default function TaskList({ tasks, isValidTitle, receiveTasks }) {
    return (
        <div className="Tasks">
            {
                tasks.map(task =>
                    <Task key={task.uuid} isValidTitle={isValidTitle} task={task} receiveTasks={receiveTasks}/>)
            }
        </div>
    )
}
import Task from "./Task";

export default function TaskList( { tasks, deleteTask}) {
    return (
        <div className="Tasks">
        {            
            tasks.map((task, index) => <Task key={index} id={index} title={task.title} date={task.date} deleteCallback={deleteTask} />)
        }
        </div>
    )
}
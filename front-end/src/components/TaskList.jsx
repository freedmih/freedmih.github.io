import Task from "./Task";

export default function TaskList( { tasks, deleteTask, changeStatus }) {
    return (
        <div className="Tasks">
        {            
            tasks.map((task, index) => 
                <Task key={index} id={index} title={task.title} date={task.date} deleteCallback={deleteTask} changeStatus={changeStatus} isDone={task.isDone} />)
        }
        </div>
    )
}
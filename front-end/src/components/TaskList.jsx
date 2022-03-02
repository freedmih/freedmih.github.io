import Task from "./Task";

export default function TaskList({ tasks, deleteTask, changeStatus, filter }) {
    
    const needToShow = (status) => {
        if(filter == 0) return true;
        else if(filter == 1 && status) return true;
        else if(filter == 2 && !status) return true;
        return false;
    }
    
    return (
        <div className="Tasks">
            {
                tasks.filter(x => needToShow(x.isDone)).map((task, index) =>
                    <Task key={task.id} id={task.id} title={task.title} date={task.date} deleteCallback={deleteTask} changeStatus={changeStatus} isDone={task.isDone} />)
            }
        </div>
    )
}
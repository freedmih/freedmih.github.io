import Task from "./Task";

const PAGE_SIZE = 5;

export default function TaskList({ tasks, deleteTask, changeStatus, filter, page, saveTitle }) {

    const needToShow = (status) => {
        if (filter === 0) return true;
        else if (filter === 1 && status) return true;
        else if (filter === 2 && !status) return true;
        return false;
    }

    return (
        <div className="Tasks">
            {
                tasks.filter(task => needToShow(task.isDone)).slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE).map((task, index) =>
                <Task key={task.id} id={task.id} title={task.title} date={task.date} deleteCallback={deleteTask} changeStatus={changeStatus} isDone={task.isDone}
                    saveTitle={saveTitle}
                />)
            }
        </div>
    )
}
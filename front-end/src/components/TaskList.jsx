import Task from "./Task";

const PAGE_SIZE = 5;

export default function TaskList({ tasks, deleteTask, changeStatus, filter, page, saveTitle, tasks2 }) {
    return (
        <div className="Tasks">
            {
                tasks2.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE).map(task =>
                <Task key={task.id} id={task.id} title={task.title} date={task.date} deleteCallback={deleteTask} changeStatus={changeStatus} isDone={task.isDone}
                    saveTitle={saveTitle}
                    />)
            }
        </div>
    )
}
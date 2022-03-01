export default function Task(props) {
    return (
        <div className="task">
            <div className="task-left">
                <input type="checkbox" className="btn-track" />
                <p>{props.title}</p>
            </div>
            <div className="task-right">
                <p>{props.date}</p>
                <button className="btn-delete-task" onClick={() => props.deleteCallback(props.id)}>Delete</button>
            </div>
        </div>
    )
}
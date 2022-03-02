export default function Task(props) {

    let date = new Date(props.date);
    let dateStr = `${date.getTime()} ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

    return (
        <div className="task">
            <div className="task-left">
                <input type="checkbox" className="btn-track" />
                <p>{props.title}</p>
            </div>
            <div className="task-right">
                <p>{dateStr}</p>
                <button className="btn-delete-task" onClick={() => props.deleteCallback(props.id)}>Delete</button>
            </div>
        </div>
    )
}
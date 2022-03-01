export default function Task(props) {
    return (
        <div class="task">
        <div class="task-left">
            <input type="checkbox" class="btn-track"/>
            <p>{props.title}</p>
        </div>
        <div class="task-right">
            <p>{props.date}</p>
            <button class="btn-delete-task">Delete</button>
        </div>
    </div>
    )
}
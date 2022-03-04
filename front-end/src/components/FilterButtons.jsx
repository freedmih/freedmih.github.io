import { Constants } from "../constants";

const GetFilterStyle = selected => selected ? "control-button control-button-selected" : "control-button";

export default function FilterButtons({ filter, setFilter }) {

    return (
        <div className="control-buttons">
            <button className={GetFilterStyle(filter === Constants.FILTER_ALL)} onClick={() => setFilter(Constants.FILTER_ALL)}>All</button>
            <button className={GetFilterStyle(filter === Constants.FILTER_DONE)} onClick={() => setFilter(Constants.FILTER_DONE)}>Done</button>
            <button className={GetFilterStyle(filter === Constants.FILTER_UNDONE)} onClick={() => setFilter(Constants.FILTER_UNDONE)}>Undone</button>
        </div>
    )
}
import { Constants } from "../constants";

const GetFilterStyle = selected => selected ? "control-button control-button-selected" : "control-button";

export default function FilterButtons({ filter, changeFilter }) {

    return (
        <div className="control-buttons">
            <button className={GetFilterStyle(filter === Constants.FILTER_ALL)} onClick={() => changeFilter(Constants.FILTER_ALL)}>All</button>
            <button className={GetFilterStyle(filter === Constants.FILTER_DONE)} onClick={() => changeFilter(Constants.FILTER_DONE)}>Done</button>
            <button className={GetFilterStyle(filter === Constants.FILTER_UNDONE)} onClick={() => changeFilter(Constants.FILTER_UNDONE)}>Undone</button>
        </div>
    )
}
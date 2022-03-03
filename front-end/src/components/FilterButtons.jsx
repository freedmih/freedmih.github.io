import { useContext } from "react";
import { AppContext } from "../Context";

const GetFilterStyle = selected => selected ? "control-button control-button-selected" : "control-button";

export default function FilterButtons({ filter, changeFilter }) {

    const Context = useContext(AppContext);

    return (
        <div className="control-buttons">
            <button className={GetFilterStyle(filter === Context.FILTER_ALL)} onClick={() => changeFilter(Context.FILTER_ALL)}>All</button>
            <button className={GetFilterStyle(filter === Context.FILTER_DONE)} onClick={() => changeFilter(Context.FILTER_DONE)}>Done</button>
            <button className={GetFilterStyle(filter === Context.FILTER_UNDONE)} onClick={() => changeFilter(Context.FILTER_UNDONE)}>Undone</button>
        </div>
    )
}
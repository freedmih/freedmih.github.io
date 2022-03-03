import upArrow from './../svg/upArrow.svg';
import downArrow from './../svg/downArrow.svg';

export default function SortButtons( { sortUp, sortDown } ) {
    return (
        <div className="sort-buttons">
            <p>Sort by Date</p>
            <button onClick={() => sortUp()}><img src={upArrow} className="icon" alt="Sort by down date" /></button>
            <button onClick={() => sortDown()}><img src={downArrow} className="icon icon-up" alt="Sort by up date" /></button>
        </div>
    )
}
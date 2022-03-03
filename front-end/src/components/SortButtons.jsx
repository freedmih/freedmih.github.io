import upArrow from './../svg/upArrow.svg';
import downArrow from './../svg/downArrow.svg';

import { Constants } from '../constants';

export default function SortButtons( { sortByDate } ) {
    return (
        <div className="sort-buttons">
            <p>Sort by Date</p>
            <button onClick={() => sortByDate(Constants.DATE_FILTER_DIRECTION_DOWN)}><img src={upArrow} className="icon" alt="Sort by down date" /></button>
            <button onClick={() => sortByDate(Constants.DATE_FILTER_DIRECTION_UP)}><img src={downArrow} className="icon icon-up" alt="Sort by up date" /></button>
        </div>
    )
}
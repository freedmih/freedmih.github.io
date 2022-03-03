import { useMemo } from "react";
import { Constants } from "../constants";


export default function Pagination({ count, activePage, setActivePage }) {
    const buttonsInfo = useMemo(() => {
        const pageButtons = [];

        let start = activePage > 1 ? activePage - 2 : Constants.FIRST_PAGE_INDEX;
        let lastPage = Math.ceil(count / Constants.MAX_TASKS_PER_PAGE);
    
        let end = start + Constants.MAX_PAGINATION_PAGES > lastPage ? lastPage : start + Constants.MAX_PAGINATION_PAGES;
    
        if(lastPage > Constants.MAX_PAGINATION_PAGES - 1 && end - start < Constants.MAX_PAGINATION_PAGES) {
            start = end - Constants.MAX_PAGINATION_PAGES;
        }

        for (let i = start; i < end; i++) {
            pageButtons.push(<button key={i} className={i === activePage ? "button-pag-selected" : ""} onClick={() => setActivePage(i)}>{i + 1}</button>)
        } 

        return {
            buttons: pageButtons,
            lastPage
        }
    }, [activePage, count, setActivePage]);

    return (
        <div className="pagination">
            <button onClick={() => setActivePage(Constants.FIRST_PAGE_INDEX)}>{'<<'}</button>
            <button disabled={activePage <= Constants.FIRST_PAGE_INDEX} onClick={() => setActivePage(activePage - 1)}>{'<'}</button>
            {buttonsInfo.buttons}
            <button disabled={activePage >= buttonsInfo.lastPage - 1} onClick={() => setActivePage(activePage + 1)}>{'>'}</button>
            <button onClick={() => setActivePage(buttonsInfo.lastPage - 1)}>{'>>'}</button>
        </div>
    )
}
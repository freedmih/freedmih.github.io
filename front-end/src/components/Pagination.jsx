export default function Pagination({ count, activePage, setActivePage }) {
    let pageButtons = [];
    
    let start = activePage > 1 ? activePage - 2 : 0
    let lastPage = Math.ceil(count / 5);

    let end = start + 5 > lastPage ? lastPage : start + 5;

    for (let i = start; i < end; i++) {
        pageButtons.push(<button key={i} className={i === activePage ? "button-pag-selected" : ""} onClick={() => setActivePage(i)}>{i + 1}</button>)
    }

    return (
        <div className="pagination">
            <button onClick={() => setActivePage(0)}>{'<<'}</button>
            <button disabled={activePage <= 0} onClick={() => setActivePage(activePage - 1)}>{'<'}</button>
            {pageButtons}
            <button disabled={activePage >= lastPage - 1} onClick={() => setActivePage(activePage + 1)}>{'>'}</button>
            <button onClick={() => setActivePage(lastPage - 1)}>{'>>'}</button>
        </div>
    )
}
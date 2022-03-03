export default function Pagination({ count, activePage, setActivePage }) {
    let pageButtons = [];

    let start = activePage > 1 ? activePage - 2 : 0
    let lastPage = Math.ceil(count / 5);

    let end = start + 5 > lastPage ? lastPage : start + 5

    for (let i = start; i < end; i++) {
        pageButtons.push(<button className={i === activePage ? "button-pag-selected" : ""} onClick={() => setActivePage(i)}>{i + 1}</button>)
    }

    return (
        <div class="pagination">
            <button onClick={() => setActivePage(0)}>{'<<'}</button>

            {pageButtons}

            <button onClick={() => setActivePage(1)}>{'>>'}</button>
        </div>
    )
}
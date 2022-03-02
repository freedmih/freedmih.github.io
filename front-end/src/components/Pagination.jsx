export default function Pagination( { count, activePage, setActivePage }) {

    const siblingCount = 5;
    const totalPageNumbers = siblingCount + 5;
    const leftSiblingIndex = Math.max(activePage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
        activePage + siblingCount,
        totalPageNumbers
    );
    const lastPageIndex = Math.min(Math.ceil(count / 5), rightSiblingIndex);
    
    let leftPageStart = leftSiblingIndex
    let rightPageStart = rightSiblingIndex 

    let pageButtons = [];

    for(let i = leftPageStart; i < rightPageStart; i++) {
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
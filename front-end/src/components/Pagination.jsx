export default function Pagination( { count }) {

    const pages = Math.ceil(count / 5)
    //console.log(count, pages)

    return (
        <div class="pagination">
            <button>{'<<'}</button>
            {
                      
            }
            <button>{'>>'}</button>
        </div>
    )
}
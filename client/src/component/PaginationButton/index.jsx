import { usePaginationContext } from '../../utils/GlobalState';

export default function PaginationButton({ resLength }) {
  const { limit, offset, setOffset } = usePaginationContext();
  const totalPages = Math.ceil(resLength / limit);
  const currentPage = offset / limit + 1;
  const pages = new Array(totalPages);

  for (let i = 0; i < totalPages; i++) {
    pages[i] = i + 1;
  }

  function onPrevClick() {
    if (currentPage > 1) {
      setOffset(Math.max(0, offset - limit));
    }
  }
  function onNextClick() {
    if (currentPage < totalPages) {
      setOffset(offset + limit);
    }
  }
  /** @param {Event} e */
  function onSelectPage(e) {
    const page = +e.target.value;
    setOffset((page - 1) * limit);
  }

  console.log('limit: ', limit, 'offset: ', offset);
  console.log('total pages: ', totalPages);
  console.log('current page: ', currentPage);

  return (
    <div>
      <div className="m-auto flex w-full justify-center gap-4">
        <button onClick={onPrevClick} hidden={currentPage === 1}>
          Prev
        </button>
        <select 
          name="pageSelect" 
          value={currentPage}
          onChange={onSelectPage}
        >
          {pages.map(page => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
        <button onClick={onNextClick} hidden={currentPage >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

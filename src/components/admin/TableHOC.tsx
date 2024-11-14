import {
  useTable,
  Column,
  TableOptions,
  useSortBy,
  usePagination,
} from "react-table";

function TableHOC<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassName: string,
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      pageCount,
      nextPage,
      canNextPage,
      previousPage,
      canPreviousPage,
      state: { pageIndex },
    } = useTable(options, useSortBy, usePagination);
    return (
      <div className={containerClassName}>
        <h2 className="heading">{heading}</h2>
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((columns) => (
                  <th
                    {...columns.getHeaderProps(columns.getSortByToggleProps())}
                  >
                    {columns.render("Header")}

                    {columns.isSorted && (
                      <span>{columns.isSortedDesc ? "🔽" : "🔼"}</span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {showPagination && (
          <div className="tablePagination">
            <button disabled={!canPreviousPage} onClick={previousPage}>
              Prev
            </button>

            {`${pageIndex + 1} of ${pageCount}`}
            <button disabled={!canNextPage} onClick={nextPage}>
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;

import { cn } from '../../assets/js/utils'

const getCellValue = (row, column, rowIndex) => {
  if (typeof column.render === 'function') {
    return column.render(row, rowIndex)
  }

  if (column.accessor) {
    return typeof column.accessor === 'function'
      ? column.accessor(row, rowIndex)
      : row?.[column.accessor]
  }

  return row?.[column.key]
}

const resolveRowKey = (rowKey, row, index) => {
  if (!rowKey) return index
  return typeof rowKey === 'function' ? rowKey(row, index) : row?.[rowKey] ?? index
}

const Table = ({
  columns = [],
  data = [],
  rowKey,
  emptyState = 'No records found.',
  className,
  tableClassName,
  ...props
}) => {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-slate-200', className)} {...props}>
      <table className={cn('min-w-full divide-y divide-slate-200 text-left text-sm', tableClassName)}>
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            {columns.map((column) => (
              <th key={column.key ?? column.accessor} className={cn('px-6 py-3 font-semibold uppercase tracking-wide')}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-slate-400">
                {emptyState}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={resolveRowKey(rowKey, row, rowIndex)} className="hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.key ?? column.accessor} className={cn('px-6 py-4 align-middle')}>
                    {getCellValue(row, column, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table

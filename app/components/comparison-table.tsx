'use client'

interface ComparisonTableProps {
  title?: string
  columns: {
    header: string
    key: string
    align?: 'left' | 'center' | 'right'
  }[]
  data: Record<string, any>[]
  className?: string
}

export function ComparisonTable({ title, columns, data, className = '' }: ComparisonTableProps) {
  return (
    <div className={`my-8 ${className}`}>
      {title && (
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-neutral-400">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          {title}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-neutral-700/50 bg-gradient-to-b from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-neutral-700/50">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 bg-neutral-800/60 ${
                    column.align === 'right'
                      ? 'text-right'
                      : column.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  } ${index === 0 ? 'w-[30%]' : 'w-[35%]'}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/30">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`transition-all duration-200 hover:bg-neutral-800/40 ${
                  row.highlight ? 'bg-green-500/5 border-l-2 border-l-green-500/50' : ''
                }`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-4 break-words ${
                      column.align === 'right'
                        ? 'text-right'
                        : column.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                    } ${
                      colIndex === 0
                        ? 'font-medium text-neutral-200 text-sm'
                        : row.highlight
                        ? 'font-semibold text-green-400 text-sm sm:text-base'
                        : 'text-neutral-300 text-sm sm:text-base'
                    }`}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

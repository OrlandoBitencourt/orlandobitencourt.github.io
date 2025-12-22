'use client'

interface BarData {
  label: string
  value: number
  color?: string
  subtitle?: string
}

interface BarChartProps {
  title?: string
  data: BarData[]
  maxValue?: number
  unit?: string
  height?: number
  showValues?: boolean
  orientation?: 'vertical' | 'horizontal'
  startFromMin?: boolean // Start scale from minimum value instead of zero
}

export default function BarChart({
  title,
  data,
  maxValue,
  unit = '',
  height = 300,
  showValues = true,
  orientation = 'vertical',
  startFromMin = false
}: BarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value))
  const min = startFromMin ? Math.min(...data.map(d => d.value)) : 0
  const range = max - min

  const formatValue = (value: number): string => {
    // Format large numbers (K, M, B)
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toLocaleString()
  }

  const getDefaultColor = (index: number): string => {
    const colors = [
      '#ef4444', // red
      '#22c55e', // green
      '#3b82f6', // blue
      '#f59e0b', // amber
      '#8b5cf6', // purple
      '#ec4899', // pink
    ]
    return colors[index % colors.length]
  }

  if (orientation === 'horizontal') {
    return (
      <div className="w-full my-8 p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950">
        {title && (
          <h3 className="text-lg font-semibold mb-6 text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
        )}

        <div className="space-y-4">
          {data.map((item, index) => {
            const percentage = ((item.value - min) / range) * 100
            const color = item.color || getDefaultColor(index)

            return (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {item.label}
                    </div>
                    {item.subtitle && (
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  {showValues && (
                    <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 ml-4">
                      {formatValue(item.value)}{unit}
                    </div>
                  )}
                </div>

                <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-8 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color,
                      minWidth: percentage > 0 ? '2rem' : '0'
                    }}
                  >
                    <span className="text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Vertical orientation
  return (
    <div className="w-full my-8 p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950">
      {title && (
        <h3 className="text-lg font-semibold mb-6 text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
      )}

      <div
        className="flex items-end justify-center gap-2 md:gap-4"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const percentage = ((item.value - min) / range) * 100
          const color = item.color || getDefaultColor(index)

          return (
            <div
              key={index}
              className="flex flex-col items-center group min-w-0"
              style={{
                flex: `0 1 ${Math.max(80, 100 / data.length)}px`,
                maxWidth: '120px'
              }}
            >
              {/* Bar container */}
              <div className="w-full flex flex-col items-center justify-end relative overflow-visible" style={{ height: '100%' }}>
                {/* Value on hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  <div className="bg-neutral-900 dark:bg-neutral-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                    {formatValue(item.value)}{unit}
                  </div>
                </div>

                {/* Bar */}
                <div
                  className="w-full rounded-t-lg transition-all duration-500 ease-out relative group-hover:opacity-90"
                  style={{
                    height: `${percentage}%`,
                    backgroundColor: color,
                    minHeight: percentage > 1 ? '4px' : '0'
                  }}
                />
              </div>

              {/* Label */}
              <div className="mt-3 text-center w-full">
                <div className="text-xs md:text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate" title={item.label}>
                  {item.label}
                </div>
                {item.subtitle && (
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 truncate" title={item.subtitle}>
                    {item.subtitle}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend with actual values (always visible for vertical) */}
      {showValues && (
        <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.color || getDefaultColor(index) }}
                />
                <div className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                  <span className="font-semibold">{item.label}:</span> {formatValue(item.value)}{unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

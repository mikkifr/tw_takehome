import { TimeSeries, PanelChrome, Text, useTheme2 } from '@grafana/ui'
import { applyFieldOverrides } from '@grafana/data'
import { createTimeSeriesData } from '@/components/utils'

interface StockChartProps {
  stockData: any
  symbol: string
  width?: number
  height?: number
  title?: string
}

export const StockChart: React.FC<StockChartProps> = ({
  stockData,
  symbol,
  width = 1216,
  height = 400,
  title,
}) => {
  const theme = useTheme2()

  if (!stockData) {
    return <Text>No chart data available</Text>
  }

  const chartTitle = title || `${symbol} Price Chart`

  return (
    <PanelChrome width={width} height={height} title={chartTitle}>
      {(innerWidth, innerHeight) => {
        const timeSeriesData = createTimeSeriesData(stockData, symbol)

        if (!timeSeriesData) return <Text>No chart data available</Text>

        const displayData = applyFieldOverrides({
          data: [timeSeriesData],
          fieldConfig: {
            overrides: [],
            defaults: {},
          },
          theme,
          replaceVariables: (value: string) => value,
        })[0]

        return (
          <TimeSeries
            frames={[displayData]}
            timeRange={{ from: Date.now() - 100 * 24 * 60 * 60 * 1000, to: Date.now() }}
            timeZone="browser"
            width={innerWidth}
            height={innerHeight}
            theme={theme}
            legend={{ displayMode: 'list', placement: 'bottom' }}
          />
        )
      }}
    </PanelChrome>
  )
}
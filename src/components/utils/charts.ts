import { FieldType, MutableDataFrame, FieldSparkline } from '@grafana/data'

export const createTimeSeriesData = (stockData: any, symbol: string) => {
  if (!stockData?.data?.[0]) return null

  const series = stockData.data[0]
  const priceHistoryField = series.fields.find(f => f.name === 'Price History')

  if (!priceHistoryField?.values?.[0]) return null

  const priceHistory = priceHistoryField.values[0]

  const timestamps = Array.from({ length: priceHistory.length }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (priceHistory.length - 1 - i))
    return date.getTime()
  })

  const frame = new MutableDataFrame({
    name: `${symbol} Stock Price`,
    fields: [
      {
        name: 'Time',
        type: FieldType.time,
        values: timestamps,
      },
      {
        name: `${symbol}`,
        type: FieldType.number,
        values: priceHistory,
        config: {
          displayName: `${symbol} Price`,
          color: { mode: 'fixed', fixedColor: 'blue' },
        },
      },
    ],
  })

  return frame
}

export const createSparkline = (priceHistory: number[], price: number, change: number): FieldSparkline => {
  return {
    y: {
      name: 'Price History',
      values: priceHistory,
      type: FieldType.number,
      state: {
        range: {
          min: Math.min(...[price]),
          max: Math.max(...[price]),
          delta: change,
        },
      },
      config: {},
    },
  }
}
export const formatMarketCap = (value: string): string => {
  const num = parseFloat(value)
  if (num >= 1_000_000_000_000) return `$${(num / 1_000_000_000_000).toFixed(2)}T`
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`
  return `$${num.toLocaleString()}`
}

export const generateLogoUrl = (symbol: string): string => {
  return `https://financialmodelingprep.com/image-stock/${symbol}.png`
}

export const getLogoFromStockData = (stockData: any): string | null => {
  if (!stockData?.data?.[0]) return null

  const series = stockData.data[0]
  const logoField = series.fields.find((f: any) => f.name === '\u00A0')
  return logoField?.values[0] || null
}

interface DailyStockData {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
  '5. adjusted close': string
  '6. volume': string
  '7. dividend amount': string
  '8. split coefficient': string
}

interface MetaData {
  '1. Information': string
  '2. Symbol': string
  '3. Last Refreshed': string
  '4. Output Size': string
  '5. Time Zone': string
}

interface StockResponse {
  'Meta Data': MetaData
  'Time Series (Daily)': {
    [date: string]: DailyStockData
  }
}

export const transformStockData = (data: StockResponse, symbol: string) => {
  const series = data['Time Series (Daily)']
  const dates: string[] = Object.keys(series).sort()

  const latestDate = dates[dates.length - 1]
  const previousDate = dates[dates.length - 2]
  const latestData = series[latestDate]
  const previousData = series[previousDate]

  const high = parseFloat(latestData['2. high'])
  const low = parseFloat(latestData['3. low'])
  const close = parseFloat(latestData['4. close'])
  const previousClose = parseFloat(previousData['4. close'])
  const change = close - previousClose
  const price = close
  const changePercent = ((close - previousClose) / previousClose) * 100
  const volume = parseFloat(latestData['6. volume'])
  const timestamps = dates.map(date => parseFloat(date))
  const priceHistory = dates.map(date => parseFloat(series[date]['4. close']))
  const openHistory = dates.map(date => parseFloat(series[date]['1. open']))
  const highHistory = dates.map(date => parseFloat(series[date]['2. high']))
  const lowHistory = dates.map(date => parseFloat(series[date]['3. low']))

  const logoUrl = generateLogoUrl(symbol)

  return {
    symbol,
    high,
    low,
    close,
    change,
    changePercent,
    price,
    volume,
    timestamps,
    priceHistory,
    openHistory,
    highHistory,
    lowHistory,
    logoUrl,
  }
}
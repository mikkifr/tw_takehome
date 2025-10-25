import { StockResponse } from '@/types/api'

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

export const extractTimeSeriesDates = (stockResponse: StockResponse): string[] => {
  const series = stockResponse['Time Series (Daily)']
  return Object.keys(series).sort().reverse()
}

export const calculateHistoricalData = (stockResponse: StockResponse, limit: number = 30) => {
  const series = stockResponse['Time Series (Daily)']
  const dates = extractTimeSeriesDates(stockResponse)
  
  return dates.slice(0, limit).map((date, index) => {
    const dayData = series[date]
    const close = parseFloat(dayData['4. close'])
    const volume = parseInt(dayData['6. volume'])
    
    let changePercent = 0
    
    if (index < dates.length - 1) {
      const previousDate = dates[index + 1]
      const previousClose = parseFloat(series[previousDate]['4. close'])
      changePercent = ((close - previousClose) / previousClose) * 100
    }

    return {
      date,
      close,
      volume,
      changePercent
    }
  })
}
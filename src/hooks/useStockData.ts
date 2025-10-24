import useSWR from 'swr'

const defaultTickers = [
  'MSFT',
  'IBM',
  'AAPL',
  'GOOGL',
  'AMZN',
  'META',
  'TSLA',
  'NVDA',
  'JPM',
  'JNJ',
  'V',
  'PG',
  'WMT',
  'DIS',
  'NFLX',
  'AMD',
]

export const useStockData = (symbols: string[] = defaultTickers) => {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/stock-data/time-series-data?symbols=${symbols.join(',')}`)

  return {
    data,
    error,
    isLoading,
    mutate,
    symbols,
  }
}
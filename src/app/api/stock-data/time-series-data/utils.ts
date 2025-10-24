import { fetchData } from '@/app/api/utils'

interface BulkStockResponse {
  [symbol: string]: any
}

export async function fetchBulkStockData(symbols: string[]): Promise<BulkStockResponse> {
  const promises = symbols.map(symbol =>
    fetchData(symbol, {
      function: 'TIME_SERIES_DAILY_ADJUSTED',
      symbol,
    }).then(result => ({ symbol, result })),
  )

  const results = await Promise.all(promises)

  const data: BulkStockResponse = {}
  results.forEach(({ symbol, result }) => {
    data[symbol] = result
  })

  return data
}
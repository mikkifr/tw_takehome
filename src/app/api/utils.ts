import { merge } from 'lodash'

const BASE_URL = 'https://www.alphavantage.co/'

export async function fetchData<T>(symbol: string, params = {}): Promise<T> {
  params = merge(params, { apikey: process.env.ALPHA_API_KEY })
  const searchParams = new URLSearchParams(params)

  const response = await fetch(`${BASE_URL}/query?${searchParams}`, {
    cache: 'force-cache',
  })

  return await response.json()
}

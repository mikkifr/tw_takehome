import { NextResponse } from 'next/server'
import { FieldType } from '@grafana/data'
import { fetchData } from '@/app/api/utils'
import { calculateHistoricalData } from '@/utils/financial'
import { StockResponse } from '@/types/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 })
  }

  const stockResponse = await fetchData<StockResponse>(symbol, {
    function: 'TIME_SERIES_DAILY_ADJUSTED',
    symbol,
  })

  const historicalData = calculateHistoricalData(stockResponse, 30)

  const frame = {
    data: [{
      name: 'Historical Prices',
      fields: [
        {
          name: 'Date',
          type: FieldType.string,
          values: historicalData.map(d => new Date(d.date).toLocaleDateString()),
        },
        {
          name: 'Close Price',
          type: FieldType.number,
          values: historicalData.map(d => d.close),
          config: {
            decimals: 2,
            unit: 'currencyUSD',
          },
        },
        {
          name: 'Volume',
          type: FieldType.number,
          values: historicalData.map(d => d.volume),
        },
        {
          name: 'Change %',
          type: FieldType.number,
          values: historicalData.map(d => d.changePercent),
          config: {
            decimals: 2,
            unit: 'percent',
          },
        },
      ],
    }],
  }

  return NextResponse.json(frame, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}
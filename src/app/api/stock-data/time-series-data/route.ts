import { NextResponse } from 'next/server'
import { FieldType } from '@grafana/data'
import { transformStockData } from '@/utils'
import { fetchBulkStockData } from './utils'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbolsString = searchParams.get('symbols')
  const symbolsArray = symbolsString?.split(',') || []

  const bulkStockResponse = await fetchBulkStockData(symbolsArray)

  const transformedStockData = symbolsArray.map(symbol => (
    transformStockData(bulkStockResponse[symbol], symbol)
  ))

  const frame = {
    data: [{
      name: 'Stock Data',
      fields: [
        {
          // can't seem to figure out how to have Grafana table respect an empty column name
          name: '\u00A0',
          type: FieldType.string,
          values: transformedStockData.map(d => d.logoUrl),
          config: {
            custom: {
              cellOptions: {
                type: 'image',
              },
              width: 50,
            },
          },
        },
        {
          name: 'Symbol',
          values: transformedStockData.map(d => d.symbol),
          type: FieldType.string,
        },
        {
          name: 'Price History',
          values: transformedStockData.map(d => d.priceHistory),
          type: FieldType.other,
        },
        {
          name: 'Volume',
          type: FieldType.number,
          values: transformedStockData.map(d => d.volume),
        },
        {
          name: 'High',
          type: FieldType.number,
          values: transformedStockData.map(d => d.high),
          config: {
            decimals: 2,
          },
        },
        {
          name: 'Low',
          type: FieldType.number,
          values: transformedStockData.map(d => d.low),
          config: {
            decimals: 2,
          },
        },
        {
          name: 'Close',
          type: FieldType.number,
          values: transformedStockData.map(d => d.close),
          config: {
            decimals: 2,
          },
        },
        {
          name: 'Change',
          type: FieldType.number,
          values: transformedStockData.map(d => d.change),
          config: {
            decimals: 2,
          },
        }, {
          name: '%',
          type: FieldType.number,
          values: transformedStockData.map(d => d.changePercent),
          config: {
            unit: 'percent',
            decimals: 2,
          },
        },
      ],
    }],
  }

  return NextResponse.json(frame, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}
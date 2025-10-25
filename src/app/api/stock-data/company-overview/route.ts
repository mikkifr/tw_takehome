import { NextResponse } from 'next/server'
import { fetchData } from '../../utils'
import { CompanyOverview } from '@/types/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 })
  }

  const data = await fetchData<CompanyOverview>(symbol, {
    function: 'OVERVIEW',
    symbol,
  })

  return NextResponse.json(data, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}
import { NextResponse } from 'next/server'
import { fetchData } from '../../utils'

interface CompanyOverview {
  Symbol: string
  AssetType: string
  Name: string
  Description: string
  CIK: string
  Exchange: string
  Currency: string
  Country: string
  Sector: string
  Industry: string
  Address: string
  OfficialSite: string
  FiscalYearEnd: string
  LatestQuarter: string
  MarketCapitalization: string
  EBITDA: string
  PERatio: string
  PEGRatio: string
  BookValue: string
  DividendPerShare: string
  DividendYield: string
  EPS: string
  RevenuePerShareTTM: string
  ProfitMargin: string
  OperatingMarginTTM: string
  ReturnOnAssetsTTM: string
  ReturnOnEquityTTM: string
  RevenueTTM: string
  GrossProfitTTM: string
  DilutedEPSTTM: string
  QuarterlyEarningsGrowthYOY: string
  QuarterlyRevenueGrowthYOY: string
  AnalystTargetPrice: string
  AnalystRatingStrongBuy: string
  AnalystRatingBuy: string
  AnalystRatingHold: string
  AnalystRatingSell: string
  AnalystRatingStrongSell: string
  TrailingPE: string
  ForwardPE: string
  PriceToSalesRatioTTM: string
  PriceToBookRatio: string
  EVToRevenue: string
  EVToEBITDA: string
  Beta: string
  '52WeekHigh': string
  '52WeekLow': string
  '50DayMovingAverage': string
  '200DayMovingAverage': string
  SharesOutstanding: string
  SharesFloat: string
  PercentInsiders: string
  PercentInstitutions: string
  DividendDate: string
  ExDividendDate: string
}

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
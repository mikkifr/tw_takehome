export interface DailyStockData {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
  '5. adjusted close': string
  '6. volume': string
  '7. dividend amount': string
  '8. split coefficient': string
}

export interface MetaData {
  '1. Information': string
  '2. Symbol': string
  '3. Last Refreshed': string
  '4. Output Size': string
  '5. Time Zone': string
}

export interface StockResponse {
  'Meta Data': MetaData
  'Time Series (Daily)': {
    [date: string]: DailyStockData
  }
}

export interface CompanyOverview {
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
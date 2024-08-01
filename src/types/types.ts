export type QueryType =
  | 'TIME_SERIES_INTRADAY'
  | 'TIME_SERIES_DAILY'
  | 'TIME_SERIES_DAILY_ADJUSTED'
  | 'TIME_SERIES_WEEKLY'
  | 'TIME_SERIES_MONTHLY'

export interface TradingViewWidgetProps {
  symbol: string
  data: any[]
  interval?: string
  theme?: string
  locale?: string
  width?: string
  height?: string
  from: number
  to: number
}

export interface StockDataPropsaProps {
  data: any
  queryType: QueryType
}
export interface SearchBarProps {
  fetchStockData: (symbol: string, queryType: QueryType) => void
  setQueryType: (queryType: QueryType) => void
}

export interface ErrorResponse {
  Information: string
}

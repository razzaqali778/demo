import { QueryType } from '../types/types'

const API_KEY = process.env.REACT_APP_STOCK_DATA_KEY ?? 'demo'

export const fetchStockData = async (symbol: string, queryType: QueryType) => {
  let url = ''
  const query = symbol.toUpperCase()

  switch (queryType) {
    case 'TIME_SERIES_INTRADAY':
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${query}&interval=5min&apikey=${API_KEY}`
      break
    case 'TIME_SERIES_DAILY':
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${API_KEY}`
      break
    case 'TIME_SERIES_WEEKLY':
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${query}&apikey=${API_KEY}`
      break
    case 'TIME_SERIES_MONTHLY':
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${query}&apikey=${API_KEY}`
      break
    default:
      throw new Error('Unsupported query type')
  }

  const response = await fetch(url)
  const result = await response.json()

  if (result['Information']) {
    throw new Error(result['Information'])
  }

  return result
}

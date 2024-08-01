import { useState } from 'react'
import { ErrorResponse, QueryType } from '../types/types'
import { fetchStockData } from '../api'

const useStockData = () => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [queryType, setQueryType] = useState<QueryType>('TIME_SERIES_DAILY')

  const fetchStockDataApi = async (symbol: string, queryType: QueryType) => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchStockData(symbol, queryType)
      setData(result)
    } catch (err) {
      const errorResponse = err as ErrorResponse

      setError(errorResponse.Information || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, queryType, setQueryType, fetchStockDataApi }
}

export default useStockData

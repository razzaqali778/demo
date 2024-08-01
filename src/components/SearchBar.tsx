import React, { useState, useCallback } from 'react'
import { QueryType, SearchBarProps } from '../types/types'
import { debounce } from '../utility/utility'

const SearchBar: React.FC<SearchBarProps> = ({
  fetchStockData,
  setQueryType,
}) => {
  const [input, setInput] = useState('')
  const [selectedQuery, setSelectedQuery] =
    useState<QueryType>('TIME_SERIES_DAILY')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const debouncedFetchStockData = useCallback(
    debounce((symbol: string, queryType: QueryType) => {
      fetchStockData(symbol, queryType)
    }, 500),
    [fetchStockData]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim()

    if (trimmedInput.length > 0) {
      setErrorMessage(null)
      setQueryType(selectedQuery)
      debouncedFetchStockData(trimmedInput, selectedQuery)
    } else {
      setErrorMessage('Please enter a valid stock symbol')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    if (e.target.value.trim().length > 0) {
      setErrorMessage(null)
    }
  }

  return (
    <div className="flex flex-col items-center my-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter stock symbol"
          className="border p-2 rounded w-48"
        />
        <select
          value={selectedQuery}
          onChange={(e) => setSelectedQuery(e.target.value as QueryType)}
          className="border p-2 rounded"
        >
          <option value="TIME_SERIES_INTRADAY">Intraday</option>
          <option value="TIME_SERIES_DAILY">Daily</option>
          <option value="TIME_SERIES_WEEKLY">Weekly</option>
          <option value="TIME_SERIES_MONTHLY">Monthly</option>
        </select>
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </form>
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </div>
  )
}

export default SearchBar

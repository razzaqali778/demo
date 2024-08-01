import React from 'react'
import { Header, SearchBar, StockData } from './components/'
import useStockData from './Hooks/useStockData'

const App: React.FC = () => {
  const { data, error, loading, queryType, setQueryType, fetchStockDataApi } =
    useStockData()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <SearchBar
        fetchStockData={fetchStockDataApi}
        setQueryType={setQueryType}
      />
      {error && <div className="text-center text-red-600">{error}</div>}
      {loading && <div className="text-center">Loading...</div>}
      {data && <StockData data={data} queryType={queryType} />}
    </div>
  )
}

export default App

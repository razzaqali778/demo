import React, { useEffect, useState } from 'react'
import TradingViewWidget from './TradingViewWidget'
import { StockDataPropsaProps } from '../types/types'

const StockData: React.FC<StockDataPropsaProps> = ({ data, queryType }) => {
  const [transformedData, setTransformedData] = useState<any>(null)

  useEffect(() => {
    const transformData = () => {
      if (!data || !data['Meta Data']) {
        return null
      }

      let timeSeries: Record<string, any> | null = null
      switch (queryType) {
        case 'TIME_SERIES_INTRADAY':
          timeSeries = data['Time Series (5min)']
          break
        case 'TIME_SERIES_DAILY':
        case 'TIME_SERIES_DAILY_ADJUSTED':
          timeSeries = data['Time Series (Daily)']
          break
        case 'TIME_SERIES_WEEKLY':
          timeSeries = data['Weekly Time Series']
          break
        case 'TIME_SERIES_MONTHLY':
          timeSeries = data['Monthly Time Series']
          break
        default:
          return null
      }

      if (!timeSeries) {
        return null
      }

      const transformed = Object.entries(timeSeries).map(([time, values]) => ({
        time: new Date(time).getTime() / 1000,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
      }))

      return transformed
    }

    setTransformedData(transformData())
  }, [data, queryType])

  const getSymbol = () => {
    if (!data || !data['Meta Data']) {
      return ''
    }
    const metaData = data['Meta Data']
    const symbol = metaData['2. Symbol']
    return symbol.includes('.') ? symbol.replace('.', ':') : symbol
  }

  const symbol = getSymbol()

  if (!symbol) {
    return (
      <p className="text-center text-red-600">
        No data found. Please check the stock symbol.
      </p>
    )
  }

  const calculateRange = () => {
    if (!transformedData || transformedData.length === 0) return [0, 0]
    const times = transformedData.map((entry: any) => entry.time)
    const from = Math.min(...times)
    const to = Math.max(...times)
    return [from, to]
  }

  const [from, to] = calculateRange()

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-2">Stock Data for {symbol}</h2>
      {transformedData ? (
        <TradingViewWidget
          symbol={symbol}
          data={transformedData}
          interval={queryType === 'TIME_SERIES_INTRADAY' ? '5' : 'D'}
          from={from}
          to={to}
        />
      ) : (
        <p className="text-center">Loading chart...</p>
      )}
    </div>
  )
}

export default StockData

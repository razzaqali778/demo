import React, { useEffect } from 'react'
import { TradingViewWidgetProps } from '../types/types'

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol,
  data,
  interval = 'D',
  theme = 'dark',
  locale = 'en',
  width = '100%',
  height = '500px',
  from,
  to,
}) => {
  useEffect(() => {
    const widgetOptions = {
      symbol,
      interval,
      theme,
      locale,
      width,
      height,
      container_id: 'tradingview_widget',
      datafeed: {
        getBars: (
          symbolInfo: any,
          resolution: any,
          from: number,
          to: number,
          onHistoryCallback: any
        ) => {
          const bars = data.filter(
            (bar: any) => bar.time >= from && bar.time <= to
          )
          onHistoryCallback(bars, { noData: bars.length === 0 })
        },
      },
      library_path: '/charting_library/',

      timeframe: { from, to },
    }

    const container = document.getElementById('tradingview_widget')
    if (container) {
      container.innerHTML = ''
    }

    // @ts-ignore
    if (window.TradingView) {
      // @ts-ignore
      new window.TradingView.widget(widgetOptions)
    }
  }, [symbol, interval, theme, locale, width, height, data, from, to])

  return <div id="tradingview_widget" style={{ width, height }} />
}

export default TradingViewWidget

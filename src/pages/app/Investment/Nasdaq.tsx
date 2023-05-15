import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise: Promise<Event>;

export default function Nasdaq(): JSX.Element {
  const onLoadScriptRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (document.getElementById('tradingview_c4d8a') && 'TradingView' in window) {
        new (window as any).TradingView.widget({
          height: 300,
          width: "100%",
          symbol: "CURRENCYCOM:US100",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "de_DE",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_c4d8a"
        });
      }
    }
  }, []);

  return (
    <div className="h-full rounded-md  bg-mm-foreground shadow-lg">

    <div className='m-1 p-2 tradingview-widget-container'>
      <div id='tradingview_c4d8a' />
      {/* <div className="tradingview-widget-copyright">
        <a href="https://de.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets</span></a> on TradingView
      </div> */}
    </div>
    </div>

  );
}

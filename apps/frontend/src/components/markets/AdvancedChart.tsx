"use client";

import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts';

interface AdvancedChartProps {
  data: any[];
  type?: 'candlestick' | 'line';
}

export function AdvancedChart({ data, type = 'candlestick' }: AdvancedChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<any> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<any> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Initialize Chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8b949e', // text-brand-textMuted
      },
      grid: {
        vertLines: { color: '#ffffff10' },
        horzLines: { color: '#ffffff10' },
      },
      crosshair: {
        mode: 0, // Normal mode
        vertLine: { width: 1, color: '#ffffff40', style: 3 },
        horzLine: { width: 1, color: '#ffffff40', style: 3 },
      },
      rightPriceScale: {
        borderColor: '#ffffff10',
      },
      timeScale: {
        borderColor: '#ffffff10',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      }
    });

    chartRef.current = chart;

    // Add Series based on type
    if (type === 'candlestick') {
      seriesRef.current = (chart as any).addCandlestickSeries({
        upColor: '#4ade80', // brand-success
        downColor: '#f87171', // brand-danger
        borderVisible: false,
        wickUpColor: '#4ade80',
        wickDownColor: '#f87171',
      });
    } else {
      seriesRef.current = (chart as any).addLineSeries({
        color: '#00F0FF', // brand-cyan
        lineWidth: 2,
      });
    }

    // Add Volume Profile
    volumeSeriesRef.current = (chart as any).addHistogramSeries({
      color: '#ffffff10',
      priceFormat: { type: 'volume' },
      priceScaleId: '', // Set as an overlay
    });
    
    chart.priceScale('').applyOptions({
      scaleMargins: {
        top: 0.8, // leave space for chart
        bottom: 0,
      },
    });

    // Handle Resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [type]);

  // Update data
  useEffect(() => {
    if (!seriesRef.current || !volumeSeriesRef.current || !data.length) return;

    if (type === 'candlestick') {
      // Map data for candlestick
      const candleData = data.map(d => ({ time: d.time, open: d.open, high: d.high, low: d.low, close: d.close }));
      seriesRef.current.setData(candleData);
    } else {
      // Map data for line
      const lineData = data.map(d => ({ time: d.time, value: d.close }));
      seriesRef.current.setData(lineData);
    }

    // Map volume data
    const volumeData = data.map(d => ({
      time: d.time,
      value: d.volume,
      color: d.close >= d.open ? '#4ade8040' : '#f8717140'
    }));
    volumeSeriesRef.current.setData(volumeData);

    chartRef.current?.timeScale().fitContent();
  }, [data, type]);

  return (
    <div className="w-full h-full relative" ref={chartContainerRef}>
      {/* Chart mounts here */}
    </div>
  );
}

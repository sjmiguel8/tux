"use client";

import { useEffect, useState } from "react";
import { DataItem, DataDisplayProps } from "./types/dashboard";

function DataDisplay({ data }: DataDisplayProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.08] bg-white dark:bg-black/[.12] hover:border-black/[.16] dark:hover:border-white/[.16] transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium text-lg">
              {item.title}
            </h3>
            {item.trend && (
              <span className={`
                px-2 py-1 rounded-full text-sm font-mono
                ${item.trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                ${item.trend === 'down' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                ${item.trend === 'neutral' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' : ''}
              `}>
                {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '–'}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-mono">
            {item.description}
          </p>
          <div className="text-2xl font-semibold font-mono">
            ${item.value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.08] bg-white dark:bg-black/[.12] animate-pulse"
        >
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-full"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/dashboard');
      if (!response.ok) throw new Error('Failed to fetch data');
      const newData = await response.json();
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Update every 10 seconds for crypto prices
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Crypto Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time cryptocurrency prices and market data
          </p>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-opacity"
        >
          Refresh Data
        </button>
      </header>
      
      <main>
        {error ? (
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
            {error}
          </div>
        ) : isLoading ? (
          <LoadingState />
        ) : (
          <DataDisplay data={data} />
        )}
      </main>

      <footer className="mt-8 text-center text-sm text-gray-500">
        Data provided by CoinGecko API • Updates every 10 seconds
      </footer>
    </div>
  );
}

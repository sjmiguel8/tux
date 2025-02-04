import { NextResponse } from "next/server";

interface CryptoData {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
}

export async function GET() {
  try {
    // Add headers to avoid rate limiting
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false",
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        },
        next: { revalidate: 10 } // Cache for 10 seconds
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }

    const cryptoData: CryptoData[] = await response.json();

    // Transform the data to match our dashboard format
    const dashboardData = cryptoData.map((crypto) => ({
      id: crypto.id,
      title: crypto.symbol.toUpperCase(),
      description: `24h Volume: $${(crypto.total_volume / 1000000).toFixed(2)}M`,
      value: crypto.current_price,
      trend: crypto.price_change_percentage_24h > 0 
        ? "up" 
        : crypto.price_change_percentage_24h < 0 
          ? "down" 
          : "neutral"
    }));

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cryptocurrency data' },
      { status: 500 }
    );
  }
}

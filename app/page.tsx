interface DataItem {
  id: string;
  title: string;
  description: string;
  value: number;
  trend?: "up" | "down" | "neutral";
}

interface DataDisplayProps {
  data: DataItem[];
}

function DataDisplay({ data }: DataDisplayProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.08] bg-white dark:bg-black/[.12] hover:border-black/[.16] dark:hover:border-white/[.16] transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium text-lg">{item.title}</h3>
            {item.trend && (
              <span className={`
                px-2 py-1 rounded-full text-sm
                ${item.trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                ${item.trend === 'down' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                ${item.trend === 'neutral' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' : ''}
              `}>
                {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '–'}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {item.description}
          </p>
          <div className="text-2xl font-semibold">
            {item.value.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  // Example data
  const sampleData: DataItem[] = [
    {
      id: '1',
      title: 'Total Users',
      description: 'Active users in the last 30 days',
      value: 45892,
      trend: 'up',
    },
    {
      id: '2',
      title: 'Revenue',
      description: 'Monthly recurring revenue',
      value: 125750,
      trend: 'up',
    },
    {
      id: '3',
      title: 'Conversion Rate',
      description: 'Percentage of visitors who subscribe',
      value: 2.4,
      trend: 'down',
    },
    {
      id: '4',
      title: 'Average Time',
      description: 'Average session duration (minutes)',
      value: 8.5,
      trend: 'neutral',
    },
    {
      id: '5',
      title: 'New Sign-ups',
      description: 'New users this week',
      value: 892,
      trend: 'up',
    },
    {
      id: '6',
      title: 'Support Tickets',
      description: 'Open support requests',
      value: 43,
      trend: 'down',
    },
  ];

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time metrics and key performance indicators
        </p>
      </header>
      
      <main>
        <DataDisplay data={sampleData} />
      </main>
    </div>
  );
}

export interface DataItem {
  id: string;
  title: string;
  description: string;
  value: number;
  trend?: "up" | "down" | "neutral";
}

export interface DataDisplayProps {
  data: DataItem[];
}

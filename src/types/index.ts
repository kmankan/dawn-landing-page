export interface Agent {
  id: number;
  name: string;
  price: number;
  availability: number;
  latency: number;
  trust: number;
  highlight?: boolean;
}
export interface NavCount {
  id: string;
  name: string;
  total: number;
  counts: {
    [key: string]: number;
  };
}

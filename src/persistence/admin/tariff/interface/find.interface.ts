export interface IFindTariff {
  id: number;
  name: string;
  price: number;
  description: string;
  interval?: 'Day' | 'Month' | 'Week';
  period?: number;
  recurrent: boolean;
  recurrentPrice: number;
  startHour?: number;
  active: boolean;
}

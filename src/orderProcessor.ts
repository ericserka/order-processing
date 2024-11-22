import { IOrder } from './interfaces'

// Base Order Processor (Open/Closed Principle)
export abstract class OrderProcessor {
  abstract process(order: IOrder): Promise<IOrder>;
}

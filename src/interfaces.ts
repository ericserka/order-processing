import { OrderStatus } from './enums'

// Interfaces (Interface Segregation Principle)
export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string;
  customerId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
}

export interface IOrderRepository {
  orders: IOrder[];
  save(order: IOrder): void;
  findById(id: string): IOrder | null;
  update(order: IOrder): void;
}

export interface IInventoryService {
  checkAvailability(productId: string, quantity: number): Promise<boolean>;
  reserveItems(productId: string, quantity: number): Promise<void>;
}

export interface IPaymentService {
  processPayment(orderId: string, amount: number): Promise<boolean>;
}

export interface IOrderNotification {
  notify(order: IOrder): Promise<void>;
}


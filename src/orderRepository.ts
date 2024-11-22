import { IOrder, IOrderRepository } from "./interfaces";

// Repository Implementation (Dependency Inversion Principle)
export class OrderRepository implements IOrderRepository {
  orders: IOrder[] = [];

  save(order: IOrder): void {
    this.orders.push(order);
  }

  findById(id: string): IOrder | null {
    return this.orders.find(order => order.id === id) || null;
  }

  update(order: IOrder): void {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index >= 0) {
      this.orders[index] = order;
    }
  }
}


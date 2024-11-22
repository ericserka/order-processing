import { OrderStatus } from "./enums";
import { IOrder, IOrderNotification, IOrderRepository } from "./interfaces";
import { OrderProcessor } from "./orderProcessor";

// Order Orchestrator (Liskov Substitution Principle)
export class OrderOrchestrator {
  private processors: OrderProcessor[] = [];
  private notifiers: IOrderNotification[] = [];

  constructor(private orderRepository: IOrderRepository) { }

  addProcessor(processor: OrderProcessor): void {
    this.processors.push(processor);
  }

  addNotifier(notifier: IOrderNotification): void {
    this.notifiers.push(notifier);
  }

  async processOrder(orderId: string): Promise<IOrder> {
    const order = this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    try {
      let processedOrder = order;
      for (const processor of this.processors) {
        processedOrder = await processor.process(processedOrder);
        this.orderRepository.update(processedOrder);
      }

      if (processedOrder.status === OrderStatus.PAID) {
        await this.notifyAll(processedOrder);
      }

      return processedOrder;
    } catch (error) {
      order.status = OrderStatus.FAILED;
      this.orderRepository.update(order);
      throw error;
    }
  }

  addOrder(order: IOrder): void {
    this.orderRepository.save(order);
  }

  private async notifyAll(order: IOrder): Promise<void> {
    await Promise.all(
      this.notifiers.map(notifier => notifier.notify(order))
    );
  }
}


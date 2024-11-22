import { OrderProcessor } from './orderProcessor';
import { IPaymentService, IOrder } from './interfaces';
import { OrderStatus } from './enums'

// Concrete implementation (Single Responsibility Principle)
export class PaymentProcessor extends OrderProcessor {
  // Parameter properties: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
  constructor(private paymentService: IPaymentService) {
    super();
  }

  async process(order: IOrder): Promise<IOrder> {
    const paymentSuccess = await this.paymentService.processPayment(
      order.id,
      order.totalAmount
    );

    order.status = paymentSuccess ? OrderStatus.PAID : OrderStatus.FAILED;
    return order;
  }
}


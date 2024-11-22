import { IOrder, IOrderNotification } from "../interfaces";

export class EmailNotification implements IOrderNotification {
  async notify(order: IOrder): Promise<void> {
    console.log(`Sending email notification for customer ${order.customerId}`);
  }
}


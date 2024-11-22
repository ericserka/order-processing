import { IOrder, IOrderNotification } from "../interfaces";

export class PushNotification implements IOrderNotification {
  async notify(order: IOrder): Promise<void> {
    console.log(`Sending push notification for customer ${order.customerId}`);
  }
}


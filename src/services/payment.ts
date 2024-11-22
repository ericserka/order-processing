import { IPaymentService } from "../interfaces";

export class PaymentService implements IPaymentService {
  async processPayment(orderId: string, amount: number) {
    console.log(`Processing payment... Order ID: ${orderId}, Amount: ${amount}`)
    return true
  }
}

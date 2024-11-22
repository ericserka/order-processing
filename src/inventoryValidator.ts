import { IOrder, IInventoryService } from './interfaces'
import { OrderProcessor } from './orderProcessor'
import { OrderStatus } from './enums'

// Concrete implementation (Single Responsibility Principle)
export class InventoryValidator extends OrderProcessor {
  // Parameter properties: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
  constructor(private inventoryService: IInventoryService) {
    super();
  }

  async process(order: IOrder): Promise<IOrder> {
    for (const item of order.items) {
      const isAvailable = await this.inventoryService.checkAvailability(
        item.productId,
        item.quantity
      );
      if (!isAvailable) {
        throw new Error(`Product ${item.productId} not available in required quantity`);
      }
    }
    order.status = OrderStatus.VALIDATED;
    return order;
  }
}


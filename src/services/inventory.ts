import { IInventoryService } from "../interfaces";

export class InventoryService implements IInventoryService {
  async checkAvailability(productId: string, quantity: number) {
    console.log(`Checking availability... ${quantity} of product ${productId}`)
    return true
  }

  async reserveItems(productId: string, quantity: number) {
    console.log(`Reserving items... ${quantity} of product ${productId}`)
  }
}

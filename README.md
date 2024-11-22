# order-processing

Order processing system for an e-commerce.

The objective of this project was to see the practical application of SOLID principles.

## Example of use

To install dependencies: `npm install`

To use interactively: `npm run repl`

```typescript
const order = {
    id: Math.random().toString(36).substring(2),
    customerId: Math.random().toString(36).substring(2),
    items: [
        {
            productId: Math.random().toString(36).substring(2),
            quantity: 1,
            price: 2
        },
        {
            productId: Math.random().toString(36).substring(2),
            quantity: 2,
            price: 3
        }
    ],
    status: OrderStatus.CREATED,
    totalAmount: 8
}

orchestrator.addOrder(order)
orchestrator.processOrder(order.id)
```

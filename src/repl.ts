import repl from 'repl'
import { OrderOrchestrator } from './orderOrchestrator'
import { OrderRepository } from './orderRepository'
import { IInventoryService, IPaymentService } from './interfaces'
import { InventoryValidator } from './inventoryValidator'
import { PaymentProcessor } from './paymentProcessor'
import { EmailNotification } from './notifications/email'
import { PushNotification } from './notifications/push'
import { OrderStatus } from './enums'

const orderRepository = new OrderRepository()
const inventoryService: IInventoryService = {
  checkAvailability: async () => {
    console.log('Checking availability...')

    return true
  },
  reserveItems: async () => {
    console.log('Reserving items...')
  }
};
const paymentService: IPaymentService = {
  processPayment: async () => {
    console.log('Processing payment...')

    return true
  }
};

// Criando orquestrador
const orchestrator = new OrderOrchestrator(orderRepository);

// Adicionando processors
orchestrator.addProcessor(new InventoryValidator(inventoryService));
orchestrator.addProcessor(new PaymentProcessor(paymentService));

// Adicionando notificadores
orchestrator.addNotifier(new EmailNotification());
orchestrator.addNotifier(new PushNotification());

const r = repl.start()

r.context.orchestrator = orchestrator
r.context.OrderStatus = OrderStatus

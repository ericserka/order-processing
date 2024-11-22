import repl from 'repl'
import { OrderOrchestrator } from './orderOrchestrator'
import { OrderRepository } from './orderRepository'
import { InventoryValidator } from './inventoryValidator'
import { PaymentProcessor } from './paymentProcessor'
import { EmailNotification } from './notifications/email'
import { PushNotification } from './notifications/push'
import { OrderStatus } from './enums'
import { InventoryService } from './services/inventory'
import { PaymentService } from './services/payment'

const orderRepository = new OrderRepository()
const inventoryService = new InventoryService()
const paymentService = new PaymentService()

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

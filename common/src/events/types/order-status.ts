export enum OrderStatus {
  // When the order ahs been created, but the 
  // ticket it is trying to order has not been reserved
  Created = 'created',
  // 1.The ticekt the order is trying to reserved has already been reserved 
  // 2.when the user has cancelled the order.
  // 3.The order expires before payment
  Cancelled = 'cancelled',
  // The order has successfully reserved the ticket
  AwaitingPayment = 'awaiting:payment',
  // The order has reserved the ticket and the user has 
  // provided payment successfully
  Complete = 'complete'
}
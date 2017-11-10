Payment Methods and Payment Processing Test
=============================================

The payment flow works as following:

1. User chooses restaurant and order item - then proceeds to checkout
2. Specific payment methods are listed to the user, depending on the
   restaurant configuration and risk analysis
3. User chooses payment method and submits the order

## Task Instructions

Implement a micro service to list available payment methods to the end user and
process the payment request (steps #2 and #3).

### Tasks

1. Given a restaurant id, return the payment methods (card brands) available for
it, and return to the end user (list payments).  Payments can be online (credit
cards), or offline (cash, POS machines).
2. Process a payment (mock external calls)

Consider the following:

- The service should be able to answer tens of thousands of requests per minute
- *The configuration information does not change often*
- The payment configuration depends on the restaurant and the end user
- Available payment methods can be offline (cash, check, POS machine) or online (credit card or digital wallet)
- If the user requesting for the payment methods is a fraudster, the service
should not return online payment options
- Your data model should be flexible enough to permit cost ($) optimizations (should be easy to update)
- Gateways often have outages, but processing payments should continue working in these situations

### Processing a transaction: examples

![Payment Flows simplified](https://github.com/ifood/ifood-backend-payment-test/blob/master/onlinePaymentTransactionFlowsV3Simplified.png)

### Additional information

1. *Gateway*. External services responsible for processing the credit card transaction itself.
It's a service between the e-commerce and the Acquirers. Usually a gateway
doesn't process all payment brands. E.g., Cielo does not process Hipercard and
Rede does not process ELO cards.

2. *Sub-acquirers or Providers.* These are some full-featured gateways that are
all-in-one: anti-fraud, gateway and acquirer, used to charge e-commerces with
higher transactions fees.

3. *Acquirer.* These are the companies that interact directly with issuers (banks) and payment brands (e.g. VISA).

### Costs

Each of the external services has a cost:
* Gateway: fixed fee per transaction
* Acquirers: percentage of transaction amount
* Providers: percentage of transaction amount, already including anti-fraud and
  gateway.

## DO
- make use of mocks for the external components
- use in-memory storage or db. No need to store data in a real database (it's ok
if you do, but this is not important for us)
- visualize a high performance environment, the problems that may rise on it and
implement solutions for these problems (non-functional requirements)
- send us instructions on how to build and run your solution

## DON'T
* make any authentication/authorization mechanism. Focus on the business rules above only.
* write any front-end code. It's a backend micro service only. No screens, no HTML pages,
only request and responses. :)

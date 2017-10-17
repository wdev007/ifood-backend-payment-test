Payment Methods Test - Get Available Payments
=============================================

The payment flow works as following:

1. User chooses restaurant and order item - then proceeds to checkout
2. Specific payment methods are listed to the user, depending on the
   restaurant configuration and risk analysis
3. User chooses payment method and submits the order

The supported payment methods are configured by restaurant. _The task you're
going to implement in this test is related to the step #2 above._

## Instructions

Not all information below is directly related to this test. However, if your
solution is approved, you may be required to explain your design choices. This
is why it's important to have the big picture in mind.

### Transaction Flow

A transaction is usually composed by the following steps:

1. Anti-fraud validation

In a nutshell, it's an external service that takes all the information available
for the order and makes some classification using engine rules or machine
learning strategies. Usually has two main outputs: allow or deny.

Also, an anti-fraude also acts before the payment method is presented to the
user: _we need to consider risk before showing payment methods to the user._

2. Gateway

External services responsible for processing the credit card transaction itself.
It's a service between the e-commerce and the Acquirers. Usually a gateway
doesn't process all payment brands. E.g., Cielo does not process Hipercard and
Rede does not process ELO cards.

### Alternative flow

Sub-acquirers or Providers. These are some full-featured gateways that are
all-in-one: anti-fraud, gateway and acquirer, used to charge e-commerces with
higher transactions fees.

We use to call the complete flow _Payment Arrangement_.

## Transaction steps (or Installments)

* FRAUD_ANALYSIS: risk decision as previously described
* AUTHORIZATION: locking the balance amount related to the order in the
  customer's credit card.
* CAPTURE: the effective charge. From this step on, the charge can be visible in
  the user's credit card bill
* CANCEL: void of authorization of charge refund
* CHARGEBACK: when the user or issuer does not recognize the sale, by fraud or
  disagreement

### Costs

Each of the external services has a cost:
* Antifraud: fixed fee per transaction
* Gateway: fixed fee per transaction
* Acquirers: percentage of transaction amount
* Providers: percentage of transaction amount, already including anti-fraud and
  gateway.

# Tasks

Your task is to implement a _micro_ distributed system, with at least two
microservices. The business rules are:

1. Given a restaurant id, return the payment methods (card brands) available for
it, and return to the end user (list payments).  Payments can be online (credit
cards), or offline (cash, POS machines).
2. Before listing the payment methods to the user, process the request in the
_anti fraud_ domain. If this domain detects that the user is a fraudster, you
need to remove the online payment methods from the listing.
3. Update payment method configuration for a restaurant for a payment brand.
4. You don't need to implement the transaction flow. However, configuration data
needs to be able to tell what the transaction path is for a future checkout
step.

### Even More Hints

* It's a backend solution only, no need to write a frontend, or any html page.
* Your _micro_ distributed system doesn't need to have any authentication or
  authorization
* Keep in mind that iFood has Millions of users asking for payment methods in
  one hand, and dozens of thousands of restaurants in the other hand. So,
  implement your solution having performance in mind.
* Your solution does not need to be a production-ready solution. But feel free
  to express how you think a production solution would be. Make use of mocks and
  comments to express your design decisions.
* Your payment methods configuration for a restaurant needs to:
  * Tell exactly what is the transaction path (from the steps above) for the
    restaurant, including metadata, e.g., restaurant A can be configured as
    antifraud + gateway, but restaurant B only using a provider.
  * Easily updatable (for cost and risk reasons). In one instant, your model
    needs to support routing restaurants from gateway A to gateway B.  
  * Resilient: if any of the external services go offline, we still need to be
    able to process the transaction on an alternative service
  * For a given restaurant, transaction path can change depending on the card
    brand. E.g., different flows for VISA and MASTERCARD depending on the
    configuration.
* Send us the source code and instructions on how to build, pack and run your
  microservice. Make a video if you feel excited!


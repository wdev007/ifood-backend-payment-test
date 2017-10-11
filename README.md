Payment Methods Test - Get Available Payments
=============================================

The online payment flow works as following:

1. User chooses payment method
2. User inputs credit card information

The supported payment methods are configured by restaurant.

### Transaction Flow

A transaction is usually composed by the following steps:

1. Anti-fraud validation

In a nutshell, it's an external service that takes all
the information available for the order and makes some
classification using engine rules or machine learning 
strategies. Usually has two main outputs: allow or deny.

2. Gateway

External services responsible for processing the credit
card transaction itself. It's a service between the e-commerce
and the Acquirers. Usually a gateway does not process
all payment brands. E.g., Cielo does not process Hipercard
and Rede does not process ELO cards.

### Alternative flow

Sub-acquirers or Providers. These are some full-featured
gateways that are all-in-one: anti-fraud, gateway and acquirer, 
used to charge e-commerces with higher transactions fees.

We use to call the complete flow _Payment Arrangement_.

## Transaction steps (or Installments)

* FRAUD_ANALYSIS: risk decision as previously described
* AUTHORIZATION: locking the balance amount related to the order
in the customer's credit card.
* CAPTURE: the effective charge. From this step on, the charge
can be visible in the user's credit card bill
* CANCEL: void of authorization of charge refund
* CHARGEBACK: when the user or issuer does not recognize the
sale, by fraud or disagreement

### Costs

Each of the external services has a cost:
* Antifraud: fixed fee per transaction
* Gateway: fixed fee per transaction
* Acquirers: percentage of transaction amount
* Providers: percentage of transaction amount,
already including anti-fraud and gateway.

# Tasks

Your task is to implement a microservice with the following
endpoints:

1. Given a restaurant id, return the payment methods (card brands)
available for it, and return to the end user.
2. Update payment method configuration for a restaurant for a payment brand.
3. You don't need to implement the transaction flow. However,
configuration data needs to be able to tell what the 
transaction path is for a future checkout step.

### Instructions
* It's a backend solution only, no need to write a frontend, or any html page.
* The service does not need to have any authentication 
or authorization
* Keep in mind that iFood has Millions of users asking for
payment methods in one hand, and dozens of thousands of
restaurants in the other hand. So, implement your solution having
performance in mind.
* Your payment methods configuration for a restaurant needs to:
  * Tell exactly what is the transaction path (from the steps above)
  for the restaurant, including metadata, e.g., restaurant A
  can be configured as antifraud + gateway, but restaurant B only using a provider.
  * Easily updatable (for cost and risk reasons). In one instant, your model needs
  to support routing restaurants from gateway A to gateway B.
  * Resilient: if any of the external services go offline, we still
  need to be able to process the transaction on an alternative
  service
  * For a given restaurant, transaction path can change 
  depending on the card brand. E.g., different flows
  for VISA and MASTERCARD depending on the configuration.
* Send us the source code and instructions on how to build,
pack and run your microservice.


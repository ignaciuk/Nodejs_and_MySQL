# Nodejs\_and\_MySQL

CLI app using Nodejs and MySQL simulating a consumer-facing ordering platform and a business-facing inventory managment system.

## What the project does 

[Customer App Demo video link](https://drive.google.com/open?id=17F-_sL0c4OoCXILu5tHH9MSzVqywNAfZ)

[Manager App Demo video link](https://drive.google.com/open?id=18Y6RCYDqvDllM4v0F14ZfO2X22N9Rsf9)

###Customer-side:

1. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

2. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

3. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

###Manager-side:
 * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.


## Why the project is useful 

The project helped me better understand nodejs and MySQL.

## Who maintains and contributes to the project 

Hmm. Pretty sure this is just me.
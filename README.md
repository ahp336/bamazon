# bamazon

## Node.js & MySQL

### Overview

An Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory.

###  Customer View

MySQL database called `bamazon` created with table inside called `products`. The products table has 10 items inserted with the following columns:

* item_id (unique id for each product)

* product_name (Name of product)

* department

* price (cost to customer)

* Inventory (how much of the product is available in stores)

Customer runs a Node app called `bamazonCustomer.js` which first displays all of the items available for sale minus the stock quantity. 

* Snapshot :

    ![Pic1](https://github.com/ahp336/bamazon/blob/master/images/bamazonCustomer1.PNG)

The app then prompts users with two messages.

* The first should ask them the ID of the product they would like to buy.
* The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

* If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

* Snapshot :

    ![Pic2](https://github.com/ahp336/bamazon/blob/master/images/bamzonCustomer2.PNG)

If the store _does_ have enough of the product, the customer's order is fulfilled and updates the SQL database to reflect the remaining quantity and shows the customer the total cost of their purchase(`shown in image 1`).

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "superman",

    // Your db
    database: "bamazon_db"
});

// connect to the mysql server
connection.connect(function (err) {
    if (err) throw err;
   
    displayInvetory();
});


function displayInvetory() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);

        order();
        
    });
}

function order(){
    inquirer.prompt([
            {
                name: "item_id",
                type: "input",
                message: "Please enter the item_id for the product you want to buy",

                validate: function (value) {
                    if (!isNaN(value) && value <= 10) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the number of products you want to buy",
                
                validate: function (value) {
                    if (!isNaN(value)) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
            // variables for user inputs
            var item = answer.item_id;
            var quantity = answer.quantity;


            connection.query("SELECT * FROM products WHERE ?", { item_id: item }, function (err, results) {
                if (err) throw err;

                if (quantity <= results[0].inventory) {
                    connection.query(
                        "UPDATE products SET inventory = ? WHERE ?",[results[0].inventory - quantity, results[0].price * quantity,{item_id: item}],
                            function (err) {
                                if (err) throw err;
                                console.log(`Order placed successfully! Total cost of purchase(s) is ${results[0].price * quantity} $\n-----------------------------\n`);
                                inquirer.prompt({
                                    name: "action",
                                    type: "list",
                                    message: "Do you want to continue shopping?",
                                    choices: [
                                        "yes",
                                        "no"
                                    ]
                                }).then(function (answer) {
                                    if(answer.action == "yes"){
                                        displayInventory(results); } 
                                    
                                        else{connection.end(); }
                                    });
                            }
                    );
                } else {

                    console.log("Sorry but there is in sufficient inventory for your order. Please select a lower number of items.");
                    displayProducts();
                }
            });
        });
};
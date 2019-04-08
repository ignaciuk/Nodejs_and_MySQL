var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  
  // function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt([
            {
                name: "managerChoice",
                type: "list",
                message: "Hello Mr./Mrs./Ms./Mx. MANAGER, what would you like to do?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
            }
        ])
        .then(function(answer) {
            // based on their answer, either call the appropriate functions
            switch (answer.managerChoice) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
                case "EXIT":
                    process.exit();
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("\n\n******* Products for Sale ******* \n");
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " ... " + results[i].product_name + " ... " + "$" + results[i].price + " ... " + "Qty in stock: " + results[i].stock_quantity);
        }
        console.log("\n******* End of List ******* \n");
        start();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("\n\n******* Low Inventory Items ******* \n");
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
            console.log(results[i].item_id + " ... " + results[i].product_name + " ... " + "$" + results[i].price + " ... " + "Qty in stock: " + results[i].stock_quantity);
            } 
        }
        console.log("\n******* End of List ******* \n");
        start();
    });
}

function addToInventory () {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
    inquirer
        .prompt([
            {
                name: "inventoryAdd",
                type: "list",
                message: "Select the item to which you would like to add inventory",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                      choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                }
            },
            {
                name: "amountToAdd",
                type: "input",
                message: "Enter the quantity to add to item's inventory",
            }
        ]).then(function(response) { 
            for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === response.inventoryAdd) {
                currentItemStock = results[i].stock_quantity;
            }}
            connection.query("UPDATE products SET ? WHERE ?", 
            [
                {
                    stock_quantity: parseInt(currentItemStock) + parseInt(response.amountToAdd)
                },
                {
                    product_name: response.inventoryAdd
                }
            ],
            function(error) {
                if (error) throw err;
                console.log("\n********\nInventory updated successfully!\n********\n");
                start();
            }
            );
        });
    });
}

function addNewProduct() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "newProduct",
        type: "input",
        message: "What is the name of the product you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department would you like to place the product into?"
      },
      {
        name: "unitPrice",
        type: "input",
        message: "What is the unit price of this product?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "stockQuantity",
        type: "input",
        message: "How much of this product is currently in stock?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }

      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.newProduct,
          department_name: answer.department,
          price: answer.unitPrice || 0,
          stock_quantity: answer.stockQuantity || 0
        },
        function(err) {
          if (err) throw err;
          console.log("\n********\nYour product was added successfully!\n********\n");
          start();
        }
      );
    });
}


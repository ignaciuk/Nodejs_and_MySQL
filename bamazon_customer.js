var mysql = require("mysql");
var inquirer = require("inquirer");

var divider = "\n**********\n";

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  port: 8889,

  user: "root",

  password: "root",
  database: "bamazon_DB"
});


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  function showItems(questions) {
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      console.log(`${divider}`);
      for (var i = 0; i < results.length; i++) {
        console.log(`${results[i].item_id} ... ${results[i].product_name} ... $${results[i].price}`);
      }
      console.log(`${divider}`);
    questions();
    // connection.end();
    });
  }
  showItems(function() {
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "item_choice",
            type: "input",
            message: "Which item would you like to purchase? (Enter item number)"
          },
          {
            name: "item_quantity",
            type: "input",
            message: "How many would to like to purchase?"
          }
        ])
        .then(function(answer) {   
            var chosenItem;
            // console.log("results length 1: " + results.length);
            for (var i = 0; i < results.length; i++) {
              // console.log("results length 2: " + results.length);

              // console.log(answer.item_choice + " =?= " + results[i].item_id);

              if (results[i].item_id === parseInt(answer.item_choice)) {
                chosenItem = results[i];
                // console.log("chosenItem stock quant: " + chosenItem.stock_quantity);
              } 
            }
      
            if (chosenItem.stock_quantity < parseInt(answer.item_quantity)) {
              console.log(`${divider} Sorry, we don't have enough stock to satisfy your order ${divider}`);
            } else {

              var newQuantity = chosenItem.stock_quantity - parseInt(answer.item_quantity);
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newQuantity
                  },
                  {
                    item_id: chosenItem.item_id
                  }
                ],
                function(error) {
                  if (error) throw err;
                  // console.log("Stock updated! New stock amount: " + chosenItem.stock_quantity);

                  // start();
                }
                
              );
              // connection.end();

              var customerBalance = chosenItem.price * parseInt(answer.item_quantity);
              console.log(`${divider} Congrats, your order is on the way! You owe: $${customerBalance} ${divider}`);
              // start();

            }
            function moreBuying() {
              inquirer.prompt ([
                {
                  name: "confirm_restart",
                  type: "confirm",
                  message: "Would you like to make another purchase?"
                },
              ]).then(function(confirm) {
                if (confirm.confirm_restart) {
                  start();
                } else {
                  process.exit();
                }
              });
          }
          moreBuying();

          });

    });

  });
}

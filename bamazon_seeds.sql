USE bamazon_DB;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rainbow Pony", "Pets", 499.99, 5), 
("Fishtank Cod", "Pets", 39.99, 25), 
("Hagfish Slime", "Sticky Stuff", 15.99, 12), 
("High Viscosity Motor Oil", "Sticky Stuff", 24.99, 50), 
("Conflict-free Maple Syrup", "Sticky Stuff", 13.99, 20),
("Vowel", "Wheel of Fortune", 10.99, 5),
("Meet and Greet with Pat and Vanna", "Wheel of Fortune", 4999.99, 2),
("Jacob deGrom Bobblehead", "Mets", 39.99, 10),
("Jose Reyes Bobblehead", "Mets", 19.99, 10),
("R.A. Dickey Bobblehead", "Mets", 29.99, 10)


-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
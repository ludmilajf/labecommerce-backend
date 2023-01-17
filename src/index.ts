import { users, products, purchases, getAllUsers, getAllProducts, getAllProductById, queryProductsByName, getAllPurchasesFromUserId } from "./database";

console.log(users, products, purchases)


getAllUsers()
getAllProducts()
getAllProductById("p002")
queryProductsByName("camiseta")
getAllPurchasesFromUserId("u001")
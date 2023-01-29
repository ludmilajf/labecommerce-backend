import { PRODUCTS_CATEGORY, TProduct, TPurchase, TUser, TPurchasesProducts } from "./types";

export const users: TUser[] = [
    {
        id: "u001",
        name: "Usuário 1",
        email: "user001@labenu.com",
        password: "user001"
    },
    {
        id: "u002",
        name: "Usuário 2",
        email: "user002@labenu.com",
        password: "user002"
    },
    {
        id: "u003",
        name: "Usuário 3",
        email: "user003@labenu.com",
        password: "user003"
    }
]

export const products: TProduct[] = [
    {
        id: "p001",
        name: "Camiseta",
        price: 70,
        description: PRODUCTS_CATEGORY.CLOTHES,
        image_url: "string"
    },
    {
        id: "p002",
        name: "Tenis Nike",
        price: 250,
        description: PRODUCTS_CATEGORY.SHOES,
        image_url: "string"
    },
    {
        id: "p003",
        name: "Boné NY",
        price: 70,
        description: PRODUCTS_CATEGORY.ACCESSORIES,
        image_url: "string"
    }
]

// export const purchases: TPurchase[] = [
//     {
//         userId: "u001",
//         productId: "p002",
//         quantity: 1,
//         totalPrice: 250
//     },
//     {
//         userId: "u003",
//         productId: "p001",
//         quantity: 2,
//         totalPrice: 140
        
//     }
// ]


export const purchases: TPurchase[] = [
    {
        id: "pur001",
        buyer_id: "u001",
        total_price: 240,
        paid: 0
    }
]



// function createUser (id: string, email: string, password: string){
//     let newUser = {
//         id: id,
//         email: email,
//         password: password
//     } 
//     return users.push(newUser)
// }
// createUser("u004", "ludmila@labenu.com", "ludmila5678")

// export function getAllUsers(){
//     return console.table(users)
// }


// const createProduct = (id: string, name: string, price: number, description: PRODUCTS_CATEGORY) => {
//     const newProduct = {
//         id: id,
//         name: name,
//         price: price,
//         description: description
//     }
//     return products.push(newProduct)
// }
// createProduct("p004","Calça Moletom Nike", 149, PRODUCTS_CATEGORY.CLOTHES)

// export const getAllProducts = () => {
//     return console.table(products)
// }

// export const getAllProductById = (id: string) => {
//     let idToSearch = products.filter((product) => product.id === id)
//     return console.table(idToSearch)
// }



// export const queryProductsByName = (name: string) => {
//     let q = products.filter((product) => product.name.toLowerCase() === name.toLowerCase())
//     return console.table(q)
// }


// const createPurchase = (
//     userId: string, 
//     productId: string, 
//     quantity: number, 
//     totalPrice: number
//     ) => {
//     let newPurchase = {
//         userId: userId,
//         productId: productId,
//         quantity: quantity,
//         totalPrice: totalPrice
//     }
//     return purchases.push(newPurchase)
// }
// createPurchase("u002", "p004", 1, 149)

// export const getAllPurchasesFromUserId = (userId: string) => {
//     let userIdToSearch = purchases.filter((purchase) => purchase.userId === userId)
//     return console.table(userIdToSearch)
// }

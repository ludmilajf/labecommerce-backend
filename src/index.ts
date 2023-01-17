import { users, products, purchases, getAllUsers, getAllProducts, getAllProductById, queryProductsByName, getAllPurchasesFromUserId } from "./database";
import express, { Request, Response } from "express";
import cors from 'cors';
import { TProduct, TPurchase, TUser } from "./types";
import { isContext } from "vm";


console.log(users, products, purchases)

getAllUsers()
getAllProducts()
getAllProductById("p002")
queryProductsByName("camiseta")
getAllPurchasesFromUserId("u001")



const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003.")
    
})


// teste
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//getAllUsers
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)  
})

//getAllProducts
app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

//searchProductsByName
//esse aqui embaixo não deu certo
app.get('/product/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result: TProduct[] = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

//createUser
app.post('/users', (req: Request, res: Response) => {
    const { id, email, password } = req.body as TUser
    const newUser = {
        id: id,
        email: email,
        password: password
    }
    users.push(newUser)
    res.status(201).send('Usuário cadastrado com sucesso.')
})

//createProduct
app.post('/products', (req: Request, res: Response) => {
    const { id, name, price, category } = req.body as TProduct
    const newProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso.")
})

//createPurchase
app.post('/purchases', (req: Request, res: Response) => {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchases.push(newPurchase)
    res.status(201).send('Compra realizada com sucesso.')
})

//getProductsById
app.get("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const result = products.find((product) => product.id === id)
    res.status(200).send(result)
})

//getUserPurchasesByUserId
//também não deu certo
app.get("/users/:id/purchases", (req: Request, res: Response) => {
    const userId= req.params.userId
    const result = purchases.filter((purchase) => purchase.userId === userId)
    res.status(200).send(result)
})

//deleteUserById
app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const userIndex = users.findIndex((user) => user.id === id)
    if(userIndex >= 0){
        users.splice(userIndex, 1)
    }
    res.status(200).send("Usuário apagado com sucesso.")
})

//deleteProductById
app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const productIndex = products.findIndex((product) => product.id === id)
    if(productIndex >= 0){
        products.splice(productIndex, 1)
    }
    res.status(200).send("Produto apagado com sucesso.")
})

//editUserById
app.put("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const { email, password } = req.body as TUser
    const editUser = {
        email,
        password
    }
    const user = users.find((user) => user.id === id)
    if(user) {
        user.email = editUser.email || user.email
        user.password = editUser.password || user.password
    }
    res.status(200).send("Cadastro atualizado com sucesso.")
})

//editProductById
app.put("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const { name, price, category } = req.body as TProduct
    const editProduct = {
        name,
        price,
        category
    }
    const product = products.find((product) => product.id === id)
    if(product) {
        product.name = editProduct.name || product.name
        product.price = editProduct.price || product.price
        product.category = editProduct.category || product.category
    }
    res.status(200).send("Produto atualizado com sucesso.")
})
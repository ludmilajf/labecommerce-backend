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



app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)  
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

//esse aqui embaixo não deu certo
app.get('/product/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

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
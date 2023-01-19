import { users, products, purchases, getAllUsers, getAllProducts, getAllProductById, queryProductsByName, getAllPurchasesFromUserId } from "./database";
import express, { Request, Response } from "express";
import cors from 'cors';
import { TProduct, TPurchase, TUser, PRODUCTS_CATEGORY } from "./types";
import { isContext } from "vm";
import { isReadable } from "stream";


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
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//getAllProducts
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//searchProductsByName
//esse aqui embaixo não deu certo
app.get('/product/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length > 0) {
            const result = products.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()))
            if (result.length < 1) {
                res.status(404)
                throw new Error("Query params deve possuir ao menos um caractere.")
            } else {
                res.status(200).send(result)

            }
        } else {
            res.status(400)
            throw new Error("Query params precisa ser definido.")
        }
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//createUser
app.post('/users', (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body as TUser

        const newUser = {
            id: id,
            email: email,
            password: password
        }

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string")
            }
            const idFound = users.find((user) => user.id === id)
            if (idFound) {
                res.status(400)
                throw new Error("Essa 'id' já está sendo utilizada.")
            }

        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'Email' deve ser uma string")
            }
            const emailFound = users.find((user) => user.email === email)
            if (emailFound) {
                res.status(400)
                throw new Error("Esse email já foi castrado.")
            }
        }
        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'Password' deve ser uma string.")
        }
        users.push(newUser)
        res.status(201).send('Usuário cadastrado com sucesso.')
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//createProduct
app.post('/products', (req: Request, res: Response) => {
    try {
        const { id, name, price, category } = req.body as TProduct
        const newProduct = {
            id,
            name,
            price,
            category
        }
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string.")
            }
            const idFound = products.find((product) => product.id === id)
            if (idFound) {
                res.status(400)
                throw new Error("Essa 'id' já está sendo utilizada.")
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'Name' deve ser uma string.")
            }
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("'Price' deve ser um number.")
            }
        }
        if (category !== undefined) {
            if (
                category !== PRODUCTS_CATEGORY.ACCESSORIES &&
                category !== PRODUCTS_CATEGORY.CLOTHES &&
                category !== PRODUCTS_CATEGORY.SHOES
            ) {
                res.status(400)
                throw new Error("'Category' deve ser de um tipo válido.")
            }
        }
        products.push(newProduct)
        res.status(201).send("Produto cadastrado com sucesso.")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//createPurchase
app.post('/purchases', (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body as TPurchase
        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }
        if (userId !== undefined) {
            if (typeof userId !== "string") {
                res.status(400)
                throw new Error("'UserId' deve ser uma string.")
            }
            const userIdFound = users.find((user) => user.id === userId)
            if (!userIdFound) {
                res.status(400)
                throw new Error("Essa 'id' não está associada a um usuário existente.")
            }
        }
        if (productId !== undefined) {
            if (typeof productId !== "string") {
                res.status(400)
                throw new Error("'ProductId' deve ser uma string.")
            }
            const productIdFound = products.find((product) => product.id === productId)
            if (!productIdFound) {
                res.status(400)
                throw new Error("Essa 'id' não está associada a um produto existente.")
            }
        }
        if (quantity !== undefined) {
            if (typeof quantity !== "number") {
                res.status(400)
                throw new Error("'Quantity' deve ser um number.")
            }
        }
        if (totalPrice !== undefined) {
            if (typeof totalPrice !== "number") {
                res.status(400)
                throw new Error("'TotalPrice' deve ser um number.")
            }
        }
        purchases.push(newPurchase)
        res.status(201).send('Compra realizada com sucesso.')
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//getProductsById
app.get("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const idFound = products.find((product) => product.id === id)
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string.")
            }
            if (!idFound) {
                res.status(400)
                throw new Error("'Id' não encontrada.")
            }
        }
        res.status(200).send(idFound)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//getUserPurchasesByUserId
//também não deu certo
app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = purchases.find((purchase) => purchase.userId === id)
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'UserId' deve ser uma string.")
            }
            const userIdFound = users.find((user) => user.id === id)
            if (!userIdFound) {
                res.status(400)
                throw new Error("Essa 'id' não está associada a um usuário existente.")
            }

        }
        res.status(200).send(result)
        if (id === undefined) {
            res.status(400).send("Compra não encontrada.")
        }

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//deleteUserById
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userIndex = users.findIndex((user) => user.id === id)
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string.")
            }
            if (userIndex) {
                res.status(400)
                throw new Error("'Id' não encontrada.")
            }
            if (!userIndex) {
                users.splice(userIndex, 1)
            }
        }
        res.status(200).send("Usuário apagado com sucesso.")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//deleteProductById
app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const productIndex = products.findIndex((product) => product.id === id)
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string.")
            }
            if (productIndex) {
                res.status(400)
                throw new Error("'Id' não encontrada.")
            }
            if (!productIndex) {
                products.splice(productIndex, 1)
            }
        }
        res.status(200).send("Produto apagado com sucesso.")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//editUserById
app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { email, password } = req.body as TUser
        const editUser = {
            email,
            password
        }
        const idFound = users.find((user) => user.id === id)
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string.")
            }
            if (!idFound) {
                res.status(400)
                throw new Error("'Id' não encontrada.")
            }
        }
        if (idFound) {
            idFound.email = editUser.email || idFound.email
            idFound.password = editUser.password || idFound.password
        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'Email' deve ser uma string")
            }
            const emailFound = users.find((user) => user.email === email)

            if (emailFound) {
                emailFound.email = editUser.email || emailFound.email
                emailFound.password = editUser.password || emailFound.password
            }
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error("'Password' deve ser uma string.")
            }
            const passwordFound = users.find((user) => user.password === password)

            if (passwordFound) {
                passwordFound.email = editUser.email || passwordFound.email
                passwordFound.password = editUser.password || passwordFound.password
            }
        }
        res.status(200).send("Cadastro atualizado com sucesso.")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//editProductById
app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { name, price, category } = req.body as TProduct
        const editProduct = {
            name,
            price,
            category
        }
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string.")
            }
            const idFound = products.find((product) => product.id === id)

            if (!idFound) {
                res.status(400)
                throw new Error("'Id' não encontrada.")
            }
            if (idFound) {
                idFound.name = editProduct.name || idFound.name
                idFound.price = editProduct.price || idFound.price
                idFound.category = editProduct.category || idFound.category
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'Name' deve ser uma string.")
            }
            const nameFound = products.find((product) => product.name === name)

            if (nameFound) {
                nameFound.name = editProduct.name || nameFound.name
                nameFound.price = editProduct.price || nameFound.price
                nameFound.category = editProduct.category || nameFound.category
            }
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("'Price' deve ser um number.")
            }
            const priceFound = products.find((product) => product.price === price)
            if (priceFound) {
                priceFound.name = editProduct.name || priceFound.name
                priceFound.price = editProduct.price || priceFound.price
                priceFound.category = editProduct.category || priceFound.category
            }
        }
        if (category !== undefined) {
            if (
                category !== PRODUCTS_CATEGORY.ACCESSORIES &&
                category !== PRODUCTS_CATEGORY.CLOTHES &&
                category !== PRODUCTS_CATEGORY.SHOES
            ) {
                res.status(400)
                throw new Error("'Category' deve ser de um tipo válido.")
            }
            const categoryFound = products.find((product) => product.category === category)
            if (categoryFound) {
                categoryFound.name = editProduct.name || categoryFound.name
                categoryFound.price = editProduct.price || categoryFound.price
                categoryFound.category = editProduct.category || categoryFound.category
            }
        }
        res.status(200).send("Produto atualizado com sucesso.")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})


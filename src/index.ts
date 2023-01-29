import { users, products, purchases } from "./database";
import express, { Request, Response } from "express";
import cors from 'cors';
import { TProduct, TPurchase, TUser, PRODUCTS_CATEGORY, TProductsInPurchase } from "./types";
import { db } from "./database/knex";



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
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db("users")
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//getAllProducts
app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db("products")
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//searchProductsByName
app.get('/product/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string;

        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400);
                throw new Error("'q' deve possuir ao menos um caracter");
            }
        } else {
            res.status(400);
            throw new Error("'q' precisa ser definido");
        }
        const result = await db("products").where({ name: q })
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//createUser
app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body as TUser

        const newUser = {
            id: id,
            name: name,
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
        await db("users").insert(newUser)

        res.status(200).send({ message: "Cadastro realizado com sucesso!" })
    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//createProduct
app.post('/products', async (req: Request, res: Response) => {
    try {
        const { id, name, price, description } = req.body as TProduct
        const newProduct = {
            id,
            name,
            price,
            description
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
        if (description !== undefined) {
            if (
                description !== PRODUCTS_CATEGORY.ACCESSORIES &&
                description !== PRODUCTS_CATEGORY.CLOTHES &&
                description !== PRODUCTS_CATEGORY.SHOES
            ) {
                res.status(400)
                throw new Error("'Description' deve ser de um tipo válido.")
            }
        }
        await db("products").insert(newProduct)

        res.status(201).send({ message: 'Produto cadastrado com sucesso!', product: newProduct })
    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//createPurchase
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const { id, buyer_id, total_price, paid } = req.body
        const newPurchase = {
            purchaseId: id,
            buyerId: buyer_id,
            totalPrice: total_price,
            paid: paid
        }
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'UserId' deve ser uma string.")
            }
            if (!id) {
                res.status(400)
                throw new Error("Essa 'id' não está associada a um usuário existente.")
            }
        }
        
        await db("purchases").insert(newPurchase)
        res.status(201).send('Compra realizada com sucesso.')
    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//getProductsById
app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (id !== undefined) {
            const idFound = products.find((product) => product.id === id)

            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string.")
            }
            if (!idFound) {
                res.status(400)
                throw new Error("'Id' não encontrada.")
            }
        }
        const result = await db("products").where({ id: id })
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//getUserPurchasesByUserId
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await db("purchases").where({ buyer_id: id })
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//deleteUserById
app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [filterDeleteUser]:TUser[] | undefined[] = await db("users").where({id:id})
    
        if(filterDeleteUser){
            await db("users").del().where({id:id})
            res.status(200).send({message:"Usuário excluido com sucesso.",user:filterDeleteUser})
        }else{
            res.status(400)
            throw new Error("Usuário não localizado")
        }

    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

//deleteProductById
app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [filterProd]: TProduct[] | undefined[] = await db("products").where({id:id})
        
        if(filterProd){
            await db("products").del().where({id:id})
            res.status(200).send({message:"Produto excluido com sucesso.",product: filterProd})
        }else{
            res.status(400)
            throw new Error("Produto não localizado!")
        }
    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

//editUserById
app.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { email, password } = req.body as TUser
        const editUser = {
            email,
            password
        }
        const [ user ] = await db("users").where({id: id})
        
        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'Email' deve ser uma string")
            }
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error("'Password' deve ser uma string.")
            }
        }

        if (user) {
            user.email = editUser.email || user.email
            user.password = editUser.password || user.password
        } else {
            res.status(404)
            throw new Error("'Id' não encontrada.")
        }
        await db("users").update(editUser).where({id: id})
        res.status(200).send("Cadastro atualizado com sucesso.")
    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

//editProductById
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { name, price, description } = req.body as TProduct
        const editProduct = {
            name,
            price,
            description
        }

        const [ product ] = await db("products").where({id: id})
        
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
        if (description !== undefined) {
            if (
                description !== PRODUCTS_CATEGORY.ACCESSORIES &&
                description !== PRODUCTS_CATEGORY.CLOTHES &&
                description !== PRODUCTS_CATEGORY.SHOES
            ) {
                res.status(400)
                throw new Error("'Category' deve ser de um tipo válido.")
            }   
        }

        if (product) {
            product.name = editProduct.name || product.name
            product.price = editProduct.price || product.price
            product.description = editProduct.description || product.description
        } else {
            res.status(404)
            throw new Error("'Id' não encontrada.")
        }
        await db("products").update(editProduct).where({id: id})
        res.status(200).send("Produto atualizado com sucesso.")
    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})




app.get('/purchases',async (req:Request,res:Response)=>{
    try {
        const result = await db("purchases")

        res.status(200).send(result)      
    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
                
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }        
    }
})

app.get('/purchases/:id', async(req:Request, res:Response)=>{
    try {
        const id = req.params.id

        const [purchase]:TPurchase[] = await db.select("purchases.*","users.name", "users.email")
        .from("purchases")
        .leftJoin("users","users.id","=","purchases.buyer_id")
        .where({"purchases.id":id})
        
        const products = await db.select("products.*", "purchases_products.quantity")
        .from("purchases_products")
        .leftJoin("products","purchases_products.product_id","=","products.id")
        .where({"purchases_products.purchase_id":id})

        const productsInPurchase:TProductsInPurchase[] =[{...purchase, products: products}]

        res.status(200).send(productsInPurchase)

        
    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
                
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        } 
    }
})


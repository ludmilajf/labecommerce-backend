import { TProduct, TPurchase, TUser } from "./types";

export const users: TUser[] = [
    {
        id: "u001",
        email: "user001@labenu.com",
        password: "user001"
    },
    {
        id: "u002",
        email: "user002@labenu.com",
        password: "user002"
    },
    {
        id: "u003",
        email: "user003@labenu.com",
        password: "user003"
    }
]

export const products: TProduct[] = [
    {
        id: "p001",
        name: "Camiseta",
        price: 70,
        category: "blusas e casacos"
    },
    {
        id: "p002",
        name: "Tenis Nike",
        price: 250,
        category: "tenis"
    },
    {
        id: "p003",
        name: "Boné NY",
        price: 70,
        category: "acessorios"
    }
]

export const purchases: TPurchase[] = [
    {
        userId: "u001",
        productId: "p002",
        quantity: 1,
        totalPrice: 250
    },
    {
        userId: "u003",
        productId: "p001",
        quantity: 2,
        totalPrice: 140
        
    }
]
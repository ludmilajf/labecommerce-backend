export enum PRODUCTS_CATEGORY {
    ACCESSORIES = "Acessórios",
    CLOTHES = "Roupas",
    SHOES = "Sapatos"
}

export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    image_url: string
}

export type TPurchase = {
    id:string
    buyer_id: string
    total_price: number
    paid:number
}

export type TProductsInPurchase = {
    id:string
    buyer_id: string
    total_price: number
    paid:number
    products:TProduct[]
}

export type TPurchasesProducts = {
    purchase_id: string, 
    product_id: string,
    quantity:number,
}
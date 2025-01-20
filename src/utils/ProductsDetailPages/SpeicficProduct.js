import { CardsData } from "./ProductData"
export const ProductId = Object.values(CardsData).flat().find((item) => item.id === parseInt(params?.id))
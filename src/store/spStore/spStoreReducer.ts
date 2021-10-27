import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IProduct} from '../../models/IProduct'
import {IOrder} from '../../models/IOrder'
import {getStorage, setStorage} from './locasStorageFunctions'
import {data} from '../../common/data'

export interface IState {
    products: IProduct[],
    basket: IOrder[],
    activeProduct: IProduct | null
}

const initialState: IState = {
    products: data,
    basket: getStorage(data),
    activeProduct: null
}

const slice = createSlice({
    name: 'spStore',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        setActiveProduct: (state, action) => {
            const activeProduct = state.products.find(product => product.id === action.payload)
            state.activeProduct = activeProduct ? activeProduct : null
        },
        addProductToBasket: (state, {payload}: PayloadAction<IProduct>) => {
            const order = state.basket.find(order => order.product.id === payload.id)
            if (order)
                order.numOfProducts++
            else
                state.basket.push({product: payload, numOfProducts: 1})
            setStorage(state.basket)
        },
        subtractProductFromBasket: (state, {payload}: PayloadAction<IProduct>) => {
            const index = state.basket.findIndex(order => order.product.id === payload.id)
            const order = state.basket[index]
            if (order.numOfProducts === 1)
                state.basket.splice(index, 1)
            else
                order.numOfProducts--
            setStorage(state.basket)
        },
        deleteProductFromBasket: (state, {payload}: PayloadAction<IProduct>) => {
            const index = state.basket.findIndex(order => order.product.id === payload.id)
            state.basket.splice(index, 1)
            setStorage(state.basket)
        }
    }
})

export const {
    setProducts, setBasket, addProductToBasket, subtractProductFromBasket, deleteProductFromBasket, setActiveProduct
} = slice.actions
export default slice.reducer

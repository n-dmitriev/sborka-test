import {IOrder} from '../../models/IOrder'
import {IOrderLocal} from '../../models/IOrderLocal'
import {IProduct} from '../../models/IProduct'

export const setStorage = (basket: IOrder[]) => {
    const data: IOrderLocal[] = basket.map(({product, numOfProducts}) =>
        ({productId: product.id, numOfProducts}))
    localStorage.setItem('basket', JSON.stringify(data))
}

export const getStorage = (products: IProduct[]) => {
    const item = localStorage.getItem('basket')
    if (item) {
        const data: IOrderLocal[] = JSON.parse(item)
        const basket: IOrder[] = []
        data.forEach(({productId, numOfProducts}) => {
            const product: IProduct | undefined = products.find(product => product.id === productId)
            if (product)
                basket.push({product, numOfProducts})
        })
        return basket
    }
    return []
}

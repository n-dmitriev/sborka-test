import * as React from 'react'
import {IOrder} from '../../models/IOrder'
import './BasketItem.scss'
import minus from '../../imgs/icons/minus.svg'
import plus from '../../imgs/icons/plus.svg'
import cross from '../../imgs/icons/cross.svg'
import {useDispatch} from 'react-redux'
import {
    addProductToBasket,
    deleteProductFromBasket,
    subtractProductFromBasket
} from '../../store/spStore/spStoreReducer'
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'
import {IProduct} from '../../models/IProduct'

interface IProps {
    order: IOrder,
    onClick: (id: string) => void
}

export const BasketItem: React.FC<IProps> = ({onClick, order: {numOfProducts, product, product: {id, img, name, price}}}: IProps) => {
    const dispatch = useDispatch()

    const onHandleClick = (action: ActionCreatorWithPayload<IProduct>) => (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        dispatch(action(product))
    }

    return (
        <div onClick={() => onClick(id)} key={id} className={'basket-item'}>
            <div className={'basket-item__img'}>
                <img src={img} alt={name}/>
            </div>
            <div className={'basket-item__description'}>
                <div className={'basket-item__description-name'}>
                    {name}
                </div>
                <div className={'basket-item__description-price'}>
                    <div className={'basket-item__description-numbers'}>
                        <img src={minus} alt={name}
                             onClick={onHandleClick(subtractProductFromBasket)}/>
                        <span>{numOfProducts}</span>
                        <img src={plus} alt={name}
                             onClick={onHandleClick(addProductToBasket)}/>
                    </div>
                    $ {price.toLocaleString()}
                </div>
            </div>
            <span onClick={onHandleClick(deleteProductFromBasket)} className="close-spinner">
                <img src={cross} alt="&#10005;"/>
            </span>
        </div>
    )
}

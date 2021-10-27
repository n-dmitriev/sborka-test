import * as React from 'react'
import './Card.scss'
import {IProduct} from '../../models/IProduct'
import {Price} from '../UI/Price/Price'
import {useDispatch} from 'react-redux'
import {addProductToBasket} from '../../store/spStore/spStoreReducer'
import {useHistory} from 'react-router-dom'
import {RouteNames} from '../../common/const'

interface IProps {
    data: IProduct
}

export const Card: React.FC<IProps> = ({data, data: {img, id, name, price}}: IProps) => {
    const dispatch = useDispatch()
    const router = useHistory()

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        dispatch(addProductToBasket(data))
    }

    return (
        <div className={'card'} onClick={() => router.push(RouteNames.PRODUCT(id))}>
            <div className={'card__img'}>
                <img src={img} alt={name}/>
            </div>
            <div className={'card__description'}>
                <div className={'card__name'}>{name}</div>
                <Price onClick={onClick} price={price}/>
            </div>
        </div>
    )
}

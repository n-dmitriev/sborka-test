import * as React from 'react'
import './Basket.scss'
import {useTypedSelector} from '../../common/hooks'
import {BasketItem} from '../BasketItem/BasketItem'
import {tax, shipping, RouteNames} from '../../common/const'
import {Dispatch, SetStateAction} from 'react'
import crossB from '../../img/icons/crossB.svg'
import {useHistory} from 'react-router-dom'

interface IProps {
    basketIsShow: boolean,
    showBasket: Dispatch<SetStateAction<boolean>>
}

export const Basket: React.FC<IProps> = ({basketIsShow, showBasket}: IProps) => {
    const {basket} = useTypedSelector(state => state.spStore)
    const router = useHistory()

    const onClick = (id: string) => {
        router.push(RouteNames.PRODUCT(id))
        basketIsShow && showBasket(false)
    }

    const getSubtotal = () => {
        let sum = 0
        basket.forEach(order => {
            sum += order.product.price * order.numOfProducts
        })
        return sum
    }

    const subTotal = getSubtotal(), total = subTotal + tax + shipping

    const content =
        <>
            <div className={'basket__products'}>
                <div className={'title-2'}>
                    My basket
                </div>
                <div className={'basket__products-list'}>
                    {basket.map(order => <BasketItem onClick={onClick} key={order.product.id} order={order}/>)}
                </div>
            </div>
            <div className={'basket__cost'}>
                <div className={'basket__cost-names'}>
                    <div>Subtotal</div>
                    <div>Tax</div>
                    <div>Shipping</div>
                    <div className={'title-2'}>Total</div>
                </div>
                <div className={'basket__cost-prices'}>
                    <div>${subTotal.toLocaleString()}</div>
                    <div>${tax.toLocaleString()}</div>
                    <div>${shipping.toLocaleString()}</div>
                    <div className={'title-2'}>${subTotal ? total.toLocaleString() : 0}</div>
                </div>
            </div>
        </>

    return (
        <>
            <div className={'d-none d-lg-block basket'}>
                <div className={'basket__content'}>
                    {content}
                </div>
            </div>
            {basketIsShow &&
            <div className={'d-block d-lg-none basket basket_mobile'}>
                <div className={'basket__content'}>
                    <span onClick={() => showBasket(false)} className="close-spinner basket__close">
                        <img src={crossB} alt="&#10005;"/>
                    </span>
                    {content}
                </div>
            </div>
            }
        </>
    )
}

Basket.defaultProps = {
    basketIsShow: false,
    showBasket: () => null
}

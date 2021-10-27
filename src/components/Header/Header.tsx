import * as React from 'react'
import logo from '../../img/icons/logo.svg'
import './Header.scss'
import {useHistory} from 'react-router-dom'
import {RouteNames} from '../../common/const'
import {useTypedSelector} from '../../common/hooks'
import basketLogo from '../../img/icons/basket.svg'
import {Dispatch, SetStateAction} from 'react'

interface IProps {
    basketIsShow: boolean,
    showBasket: Dispatch<SetStateAction<boolean>>
}

export const Header: React.FC<IProps> = ({showBasket, basketIsShow}: IProps) => {
    const router = useHistory()
    const {basket} = useTypedSelector(state => state.spStore)

    const getQuantity = () => {
        let quantity = 0
        basket.forEach(order => quantity += order.numOfProducts)
        return quantity
    }

    const quantity = getQuantity()

    return (
        <nav className={'header'}>
            <div className={'header__content'}>
                <div className={'header__logo'} onClick={() => router.push(RouteNames.PRODUCTS())}>
                    <img src={logo} alt="SP.shop" loading="lazy"/>
                </div>
                <div className={'header__basket'} onClick={() => showBasket(!basketIsShow)}>
                    <img src={basketLogo} alt="basket" loading="lazy"/>
                    {quantity ? <div className={'header__basket-quantity'}>{quantity}</div> : null}
                </div>
            </div>
        </nav>
    )
}

Header.defaultProps = {
    basketIsShow: false,
    showBasket: () => null
}

import * as React from 'react'
import logo from '../../imgs/icons/logo.svg'
import './Header.scss'
import {useHistory} from 'react-router-dom'
import {RouteNames} from '../../common/const'
import {useTypedSelector} from '../../common/hooks'
import basketLogo from '../../imgs/icons/basket.svg'
import {Dispatch, SetStateAction, useMemo} from 'react'

interface IProps {
    basketIsShow: boolean,
    showBasket: Dispatch<SetStateAction<boolean>>
}

export const Header: React.FC<IProps> = ({showBasket, basketIsShow}) => {
    const router = useHistory()
    const {basket} = useTypedSelector(state => state.spStore)

    const quantity = useMemo(() => {
        return basket.reduce((acc, order) => (acc + order.numOfProducts), 0)
    }, [basket])

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

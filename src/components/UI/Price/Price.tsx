import * as React from 'react'
import basket from '../../../imgs/icons/basketButton.svg'
import './Price.scss'

interface IProps {
    price: number,
    onClick(e: React.MouseEvent<HTMLElement>): void,
}

export const Price: React.FC<IProps> = ({onClick, price}) =>
    <div className={'price'}>
        <div className={'price__basket'} onClick={onClick}>
            <img src={basket} alt="basket"/>
        </div>
        <div className={'price__value'}>
            $ {price.toLocaleString()}
        </div>
    </div>


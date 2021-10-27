import * as React from 'react'
import basket from '../../../img/icons/basketButton.svg'
import './Price.scss'

interface IProps {
    price: number,
    onClick(e: React.MouseEvent<HTMLElement>): void,
}

export const Price: React.FC<IProps> = ({onClick, price}: IProps) =>
    <div className={'price'}>
        <div className={'price__basket'} onClick={onClick}>
            <img src={basket} alt="basket"/>
        </div>
        <div className={'price__value'}>
            $ {price.toLocaleString()}
        </div>
    </div>

Price.defaultProps = {
    onClick() {},
    price: 0
}

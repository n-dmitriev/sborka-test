import * as React from 'react'
import './Products.scss'
import {useTypedSelector} from '../../common/hooks'
import {Card} from '../../components/Card/Card'

interface IProps {
}

export const Products: React.FC<IProps> = ({}: IProps) => {
    const {products} = useTypedSelector(state => state.spStore)

    return (
        <div className={'products'}>
            <div className={'row'}>
                {
                    products.map(product =>
                        <div className="col-xl-4 col-sm-6 col-xs-12" key={product.id}>
                            <Card data={product}/>
                        </div>)
                }
            </div>
        </div>
    )
}

Products.defaultProps = {}

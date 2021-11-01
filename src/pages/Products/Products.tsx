import * as React from 'react'
import './Products.scss'
import {useTypedSelector} from '../../common/hooks'
import {Card} from '../../components/Card/Card'
import {useLayoutEffect, useState} from 'react'
import Loader from '../../components/UI/Loader/Loader'

interface IProps {
}

export const Products: React.FC<IProps> = (props) => {
    const {products} = useTypedSelector(state => state.spStore)
    const [isLoading, setLoading] = useState(true)

    useLayoutEffect(() => {
        setTimeout(() => setLoading(false), 200)
        return function () {
            setLoading(true)
        }
    }, [])

    return (
        <div className={'products'}>
            {
                !isLoading
                    ? <div className={'row'}>
                        {
                            products.map(product =>
                                <div className="col-xl-4 col-sm-6 col-xs-12" key={product.id}>
                                    <Card data={product}/>
                                </div>)
                        }
                    </div>
                    : <Loader/>
            }
        </div>
    )
}

import * as React from 'react'
import './Product.scss'
import {useEffect, useLayoutEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import {useTypedSelector} from '../../common/hooks'
import {setActiveProduct, addProductToBasket} from '../../store/spStore/spStoreReducer'
import {Price} from '../../components/UI/Price/Price'
import {RouteNames} from '../../common/const'
import {IProduct} from '../../models/IProduct'
import Loader from '../../components/UI/Loader/Loader'

interface IProps {

}

export const Product: React.FC<IProps> = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const {activeProduct} = useTypedSelector(state => state.spStore)
    const [loaded, setLoading] = useState(false)

    useEffect(() => {
        dispatch(setActiveProduct(location.pathname.split('/')[2]))
        return function () {
            dispatch(setActiveProduct(null))
        }
    }, [location.pathname])

    useLayoutEffect(() => {
        setTimeout(() => setLoading(!!activeProduct), 300)
    }, [activeProduct])

    const onClick = (product: IProduct) => dispatch(addProductToBasket(product))

    return (
        <div className={'product'}>
            {
                loaded
                    ? <div className={'row'}>
                        <div className="col-xxl-0 col-1"/>
                        <div className="col-xxl-12 col-10">
                            <button onClick={() => history.push(RouteNames.PRODUCTS())} type="button"
                                    className="btn btn-primary button">
                                Back in catalog
                            </button>

                            {activeProduct &&
                            <div className={'product__content'}>
                                <div className={'product__img'}>
                                    <img src={activeProduct.img} alt=""/>
                                </div>
                                <div className={'product__description'}>
                                    <div className={'title-1'}>
                                        {activeProduct.name}
                                    </div>
                                    {activeProduct.model}
                                </div>
                                <Price onClick={() => onClick(activeProduct)} price={activeProduct.price}/>
                            </div>
                            }
                        </div>
                        <div className="col-xxl-0 col-1"/>
                    </div>
                    : <Loader/>
            }
        </div>
    )
}

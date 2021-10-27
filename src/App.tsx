import React, {useState} from 'react'
import './App.scss'
import {Redirect, Route, Switch} from 'react-router-dom'
import {RouteNames} from './common/const'
import {Products} from './containers/Products/Products'
import {Product} from './containers/Product/Product'
import {Header} from './components/Header/Header'
import {Basket} from './components/Basket/Basket'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
    const [basketIsShow, showBasket] = useState(false)

    return (
        <div className="app">
            <Header basketIsShow={basketIsShow} showBasket={showBasket}/>
            <div className={'app__container'}>
                <div className={'app__content'}>
                    <Switch>
                        <Route path={RouteNames.PRODUCTS()} exact={true} component={Products}/>
                        <Route path={RouteNames.PRODUCT()} exact={true} component={Product}/>
                        <Redirect to={RouteNames.PRODUCTS()}/>
                    </Switch>
                </div>
                <Basket showBasket={showBasket} basketIsShow={basketIsShow}/>
            </div>
        </div>
    )
}

export default App

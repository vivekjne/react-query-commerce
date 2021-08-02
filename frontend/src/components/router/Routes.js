import React from 'react'
import { Route } from 'react-router-dom'
import { routes } from '../../helpers/constants'
import AddProductScreen from '../../screens/AddProductScreen'
import HomeScreen from '../../screens/HomeScreen'
import ProductScreen from '../../screens/ProductScreen'

const Routes = () => {
    return (
        <>
            {routes.map(({ path, component, exact, isPrivate }) => (
                <Route path={path} component={component} exact={exact} />
            ))}
        </>
    )
}

export default Routes

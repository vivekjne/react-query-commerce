import AddProductScreen from '../screens/AddProductScreen'
import HomeScreen from '../screens/HomeScreen'
import ProductScreen from '../screens/ProductScreen'

export const API_BASE_URL = '/api'

export const API_ROUTES = {
    PRODUCTS: `${API_BASE_URL}/products`,
}

export const QUERY_KEYS = {
    PRODUCTS: 'products',
    PRODUCT: 'product',
}

export const routes = [
    {
        path: '/',
        component: HomeScreen,
        isPrivate: false,
        exact: true,
    },
    {
        path: '/product/:id',
        component: ProductScreen,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/add-products',
        component: AddProductScreen,
        isPrivate: false,
        exact: true,
    },
]

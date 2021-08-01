import { useQuery } from 'react-query'
import axios from 'axios'
import { API_ROUTES, QUERY_KEYS } from '../helpers/constants'

export const fetchProduct = async (productId) => {
    const { data } = await axios.get(`${API_ROUTES.PRODUCTS}/${productId}`)
    return data
}

export default function useProduct(productId) {
    return useQuery([QUERY_KEYS.PRODUCT, productId], () =>
        fetchProduct(productId)
    )
}

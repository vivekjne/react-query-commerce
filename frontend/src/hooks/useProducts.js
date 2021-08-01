import { useQuery } from 'react-query'
import axios from 'axios'
import { API_ROUTES, QUERY_KEYS } from '../helpers/constants'

export const fetchProducts = async () => {
    const { data } = await axios.get(API_ROUTES.PRODUCTS)
    return data
}

export default function useProducts() {
    return useQuery(QUERY_KEYS.PRODUCTS, fetchProducts)
}

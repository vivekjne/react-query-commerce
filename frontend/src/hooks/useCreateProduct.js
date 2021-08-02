import { useMutation, QueryClient, useQueryClient } from 'react-query'
import axios from 'axios'
import { QUERY_KEYS } from '../helpers/constants'

export default function useCreateProduct() {
    const queryClient = useQueryClient()
    return useMutation((values) => axios.post('/api/products', values), {
        // onSuccess: async () => {
        //     await queryClient.refetchQueries(QUERY_KEYS.PRODUCTS)
        //     history.push('/')
        // },
        onMutate: async (newProduct) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(QUERY_KEYS.PRODUCTS)

            // Snapshot the previous value
            const previousProducts = queryClient.getQueryData(
                QUERY_KEYS.PRODUCTS
            )
            if (previousProducts) {
                queryClient.setQueryData(QUERY_KEYS.PRODUCTS, (old) => [
                    ...old,
                    newProduct,
                ])
            }
            // Optimistically update to the new value

            // Return a context object with the snapshotted value
            return { previousProducts }
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, newProduct, context) => {
            if (context.previousProducts) {
                queryClient.setQueryData(
                    QUERY_KEYS.PRODUCTS,
                    context.previousProducts
                )
            }
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries(QUERY_KEYS.PRODUCTS)
        },
    })
}

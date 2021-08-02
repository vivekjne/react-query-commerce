import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { QUERY_KEYS } from '../helpers/constants'
const AddProductScreen = () => {
    const [values, setValues] = React.useState({
        name: '',
        image: '',
        description: '',
        brand: '',
        category: '',
        price: null,
        countInStock: null,
        rating: null,
        numReviews: null,
    })

    let history = useHistory()

    const queryClient = useQueryClient()
    const {
        mutateAsync: createPost,
        status: createPostStatus,
        isLoading,
        isSuccess,
        isError,
    } = useMutation((values) => axios.post('/api/products', values), {
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

    const onSubmit = async (e) => {
        e.preventDefault()
        await createPost(values)

        history.push('/')
    }

    const setValue = (field, value) =>
        setValues((old) => ({ ...old, [field]: value }))
    return (
        <Container style={{ marginTop: '40px' }}>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formProductName">
                    <Form.Label>Product name</Form.Label>
                    <Form.Control
                        onChange={(e) => setValue('name', e.target.value)}
                        value={values.name}
                        type="text"
                        placeholder="Enter product name"
                        required
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formProductImage">
                    <Form.Label>Product image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product image path"
                        required
                        onChange={(e) => setValue('image', e.target.value)}
                        value={values.image}
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formProductDesc">
                    <Form.Label>Product description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product description"
                        required
                        onChange={(e) =>
                            setValue('description', e.target.value)
                        }
                        value={values.description}
                    />
                </Form.Group>
                <br />

                <Form.Group controlId="formProductBrand">
                    <Form.Label>Product brand</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product brand"
                        required
                        onChange={(e) => setValue('brand', e.target.value)}
                        value={values.brand}
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="form.categorySelect">
                    <Form.Label>Product category</Form.Label>
                    <Form.Control
                        as="select"
                        required
                        onChange={(e) => setValue('category', e.target.value)}
                        value={values.category}
                    >
                        <option>Electronics</option>
                        <option>Applicances</option>
                        <option>Clothes</option>
                    </Form.Control>
                </Form.Group>
                <br />
                <Form.Group controlId="formProductPrice">
                    <Form.Label>Product price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter product price"
                        required
                        onChange={(e) => setValue('price', e.target.value)}
                        value={values.price}
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formProductCount">
                    <Form.Label>Product count</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter product count in stock"
                        required
                        max="30"
                        onChange={(e) =>
                            setValue('countInStock', e.target.value)
                        }
                        value={values.countInStock}
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formProductRating">
                    <Form.Label>Product rating</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter product rating"
                        required
                        max="5"
                        step="0.5"
                        onChange={(e) => setValue('rating', e.target.value)}
                        value={values.rating}
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formProductReviews">
                    <Form.Label>Product number of reviews</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter product number of reviews"
                        required
                        onChange={(e) => setValue('numReviews', e.target.value)}
                        value={values.numReviews}
                    />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                    {isLoading
                        ? 'Saving...'
                        : isError
                        ? 'Error!'
                        : isSuccess
                        ? 'Saved!'
                        : 'Create Post'}
                </Button>
            </Form>
        </Container>
    )
}

export default AddProductScreen

import React from 'react'
import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import { useQueryClient } from 'react-query'
import Product from '../components/Product'
import { QUERY_KEYS } from '../helpers/constants'
import { fetchProduct } from '../hooks/useProduct'
import useProducts from '../hooks/useProducts'

const HomeScreen = () => {
    const queryClient = useQueryClient()
    const { isLoading, isError, data: products, error } = useProducts()

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    }

    if (isError) {
        return <Alert variant={'danger'}>Error: {error.message}</Alert>
    }

    const prefetchProduct = (productId) => {
        console.log('hello')
        queryClient.prefetchQuery(
            [QUERY_KEYS.PRODUCT, productId],
            () => fetchProduct(productId),
            {
                staleTime: Infinity,
            }
        )
    }

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product
                            key={product._id}
                            product={product}
                            hoverPrefetchFn={() => prefetchProduct(product._id)}
                        />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen

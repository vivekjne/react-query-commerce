import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import AddProductScreen from './screens/AddProductScreen'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Header />
                <main>
                    <Container>
                        <Route path="/" component={HomeScreen} exact />
                        <Route path="/product/:id" component={ProductScreen} />
                        <Route
                            path="/add-products"
                            component={AddProductScreen}
                        />
                    </Container>
                </main>
                <Footer />
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App

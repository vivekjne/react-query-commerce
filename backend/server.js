import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
const app = express()

dotenv.config()

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API is running...')
})

app.get('/api/products',(req,res)=>{
    res.json(products)
})

app.get('/api/products/:id',(req,res)=>{
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

app.post('/api/products',(req,res)=>{
    setTimeout(()=>{
        const product = req.body
        products.push({...product,_id:(products.length+1).toString()})
        res.json(product)
    },3000)
   
})

const PORT = process.env.PORT || 5000

app.listen(process.env.PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

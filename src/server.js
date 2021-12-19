import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

// Define app const using express
export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// Create a GET request
app.get('/', (req, res) => {
    res.send({message: 'hello'});
});

// Create a POST request
app.post('/', (req, res) => {
    // Log out the request body
    console.log(req.body)
    
    // Ackowledge the request by sending a response back 
    res.send({message: 'ok'})
});

export const start = () => {
    app.listen(3000, () => {
        console.log('server is on 3000')
    });
}

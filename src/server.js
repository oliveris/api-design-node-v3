import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

// Define app const using express
export const app = express()

// Create a router
const router = express.Router()

app.disable('x-powered-by')

// Middlewares
// Implement cross domain resource sharing
app.use(cors())
// Easier implementation for req.body
app.use(json())
// transforms the quest e.g. query string
app.use(urlencoded({ extended: true }))
// loggin middleware
app.use(morgan('dev'))
// mount the route to the app
app.use('/api', router)

// Sub routing through '/api'
router.get('/me', (req, res) => {
    res.send({ message: 'me' })
})

// How to define restful routes for a single endpoint e.g. '/dogs'
router.route('/dogs')
    .get()
    .post()

router.route('/dogs/:id')
    .get()
    .put()
    .delete()

// Create a custom middleware
// Next param is the next function to run
const log = (req, res, next) => {
    console.log('logging')
    // Throwing an error
    // throw new Error('Messag of error');
    next()
}

// A few ways you can execute middleware
// This will execute the middleware throughout the app
// app.use(log)
// This defines a single middleware to use on a route
// app.get('/data', log, (req, res) => {
//     res.send({ message : 'hello'})
// })
// You can also pass in an array like this
// These middleware work sequencially
// app.get('/data', [log, log, log], (req, res) => {
//     res.send({ message : 'hello'})
// })

// Create a GET request
app.get('/', (req, res) => {
    res.send({message: 'hello'})
})

// Create a POST request
app.post('/', (req, res) => {
    // Log out the request body
    console.log(req.body)
    
    // Ackowledge the request by sending a response back 
    res.send({message: 'ok'})
})

// Create a get request
app.get('/data', log, (req, res) => {
    res.send({ message : 'hello'})
})

// Create a post request but send back the request body
app.post('/data', (req, res) => {
    res.send(req.body)
});

// CRUD EXAMPLE

// URLs which match on parameters
// app.get('/users/:id', (req, res) => {
//     res.send({ data: 'hello' })
// })


export const start = () => {
    app.listen(3000, () => {
        console.log('server is on 3000')
    });
}

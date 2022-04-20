const express = require('express')
const cors = require('cors')

const { getCars, createCar, deleteCars, updateCar } =require('./controller')

const app = express()


app.use(express.json())
app.use(cors())



app.get('/api/cars', getCars)
app.post('/api/cars', createCar)
app.delete('/api/cars/:id',deleteCars)
app.put('/api/cars/:id', updateCar)













app.listen(4040, () => console.log('Server is docked at 4040'))
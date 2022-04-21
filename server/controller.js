const cars = require('./db.json')
let globalID = 2


module.exports = {

    getCars: (req, res) => {
        res.status(200).send(cars)
    },

    createCar: (req, res) => {
        let { title, rating, imageURL } = req.body
        let newCar = {
            id: globalID,
            title,
            rating,
            imageURL
        }
        cars.push(newCar)
        res.status(200).send(cars)
        globalID++
    },

    deleteCars: (req, res) => {
        let index = cars.findIndex(car => car.id === +req.params.id)
        cars.splice(index, 1)
        res.status(200).send(cars)
    },

    updateCar: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        console.log(type)
        let index = cars.findIndex(car => car.id === +id)

        if (cars[index].rating === 5 && type === 'plus') {
            res.status(400).send('5 is max rating')
        } else if (cars[index].rating === 1 && type === 'minus') {
            res.status(400).send('1 is the lowest')
        }   if (type === 'minus'){
            cars[index].rating--
            res.status(200).send(cars)
        } if (type ==='plus'){
            cars[index].rating++
            res.status(200).send(cars)
        }
    },
    
}
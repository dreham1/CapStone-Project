const carsContainer = document.querySelector('#cars-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4040/api/cars`

const carsCallback = ({ data: cars }) => displayCars(cars)
const errCallback = err => console.log(err)

const getAllCars = () => axios.get(baseURL).then(carsCallback).catch(errCallback)

const createCars = body => axios.post(baseURL, body).then(carsCallback).catch(errCallback)

const deleteCar = id => axios.delete(`${baseURL}/${id}`).then(carsCallback).catch(errCallback)

const updateCar = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(carsCallback).catch(errCallback)



function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')


    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createCars(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createCarCard(car) {
     const carCard = document.createElement('div')

    carCard.classList.add('car-card')
    
    carCard.innerHTML = `<img alt='car cover' src=${car.imageURL} class="car-cover"/>
    <p class="car-title">${car.title}</p>
    <div class="btns-container">
        <button onclick="updateCar(${car.id}, 'minus')">-</button>
        <p class="car-rating">${car.rating} stars</p>
        <button onclick="updateCar(${car.id}, 'plus')">+</button>
        </div>
    <button onclick="deleteCar(${car.id})">delete</button>
    `
    
    
    
    
    carsContainer.appendChild(carCard)
}

function displayCars(arr) {

    carsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createCarCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllCars()
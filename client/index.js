const baseURL = "http://localhost:4040/api/locations";

const locationsContainer = document.querySelector('#locations-container')
const form = document.querySelector('form')


const locationsCallback = ({ data: locations }) => displayLocations(locations)
const errCallback = err => console.log(err)

const getAllLocations = () => axios.get(baseURL).then(locationsCallback).catch(errCallback)
const createLocation = body => axios.post(baseURL, body).then(locationsCallback).catch(errCallback)
const deleteLocation = id => axios.delete(`${baseURL}/${id}`).then(locationsCallback).catch(errCallback)
const updateLocation = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(locationsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let place = document.querySelector('#place')
    let rating = document.querySelector('#rating')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        place: place.value,
        rating: rating, 
        imageURL: imageURL.value
    }

    createLocation(bodyObj)

    place.value = ''
    rating = ''
    imageURL.value = ''
}

function createLocationCard(location) {
    const locationCard = document.createElement('div')
    locationCard.classList.add('location-card')

    locationCard.innerHTML = `<img alt='location cover image' src=${location.imageURL} class="location-cover-image"/>
    <p class="place">${location.place}</p>
    <div class="stars">
    <form action="">
      <input class="star star-5" id="star-5(${location.id})" type="radio" name="star"/>
      <label class="star star-5" for="star-5(${location.id})"></label>
      <input class="star star-4" id="star-4(${location.id})" type="radio" name="star"/>
      <label class="star star-4" for="star-4(${location.id})"></label>
      <input class="star star-3" id="star-3(${location.id})" type="radio" name="star"/>
      <label class="star star-3" for="star-3(${location.id})"></label>
      <input class="star star-2" id="star-2(${location.id})" type="radio" name="star"/>
      <label class="star star-2" for="star-2(${location.id})"></label>
      <input class="star star-1" id="star-1(${location.id})" type="radio" name="star"/>
      <label class="star star-1" for="star-1(${location.id})"></label>
    </form>
  </div>
</div>
    <button onclick="deleteLocation(${location.id})">delete</button>
    `

    locationsContainer.appendChild(locationCard)
}

function displayLocations(arr) {
    locationsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createLocationCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllLocations()
const temp_span = document.querySelector('#temp')
const speed_span = document.querySelector('#speed')
const direction_span = document.querySelector('#direction')
const description_span = document.querySelector('#description')
const icon_img = document.querySelector('img')

const url = 'https://api.openweathermap.org/data/2.5/weather?'
const icon_url = 'https://openweathermap.org/img/wn/'
const api_key = 'null'
const getLocation = () => {
    console.log("hello world")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        document.querySelector('#lat').innerHTML = position.coords.latitude.toFixed(3) + ', '
        document.querySelector('#lng').innerHTML = position.coords.longitude.toFixed(3)
        getWeather(position.coords.latitude,position.coords.longitude)
        }),(error => {
            alert(error)
        })
    } else {
        alert("Your browser does not support geolocation!")
    }
}

// Valle del Este Latitude: 37.202605 (37 ° 12'09.4 ″ N). Longitude: -1.893586

const getWeather = (lat,lng) => {
    console.log("hello again")
    const address = url +
    'lat=' + lat +
    '&lon=' + lng +
    '&units=metric' +
    '&appid=' + api_key
    console.log(address)
    axios.get(address)
        .then(response => {
            const json = response.data
            console.log(json.main.temp)
            temp_span.innerHTML = json.main.temp + '&#8451;'
            speed_span.innerHTML = json.wind.speed + ' m/s'
            direction_span.innerHTML = json.wind.deg + '&#176;'
            description_span.innerHTML = json.weather[0].description
            const image = icon_url + json.weather[0].icon + '@2x.png'
            console.log(image)
            icon_img.src = image

        }).catch(error => {
            alert(error)
        }) 
}

getLocation()

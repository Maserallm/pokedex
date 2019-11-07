getLocation()
// $(".startUp").hide()
// $(".theDex").hide()

let theWeatherCondition = "unknown"

const weatherCodes = {
    200: "rainy", 
    202: "rainy",
    201: "rainy",
    200: "rainy",
    230: "rainy",
    231: "rainy",
    232: "rainy",
    233: "rainy",
    300: "rainy",
    301: "rainy",
    302: "rainy",
    500: "rainy",
    501: "rainy",
    502: "rainy",
    511: "rainy",
    520: "rainy",
    521: "rainy",
    522: "rainy",
    600: "snowy",
    601: "snowy",
    602: "snowy",
    610: "snowy",
    611: "snowy",
    612: "snowy",
    621: "snowy",
    622: "snowy",
    623: "snowy",
    700: "foggy",
    711: "foggy",
    721: "foggy",
    731: "foggy",
    741: "foggy",
    751: "foggy",
    800: "sunny",
    801: "partly cloudy",
    802: "partly cloudy",
    803: "windy",
    804: "windy",
    900: "rainy",
}

const thePokeTypeFavorableWeather = {
    "fire": "sunny",
    "grass": "sunny",
    "ground": "sunny",
    "normal": "partly cloudy",
    "rock": "partly cloudy",
    "fairy": "cloudy",
    "fighting": "cloudy",
    "poison": "cloudy",
    "water": "rainy",
    "electric": "rainy",
    "bug": "rainy",
    "ice": "snowy",
    "steel": "snowy",
    "dark": "foggy",
    "ghost": "foggy",
    "dragon": "windy",
    "flying": "windy",
    "psychic": "windy",
}

const weatherConditions = {
    "sunny": ["fire", "grass", "ground"],
    "partly cloudy": ["normal", "rock"],
    "cloudy": ["fairy", "fighting", "poison"],
    "rainy": ["water", "electric", "bug"],
    "snowy": ["ice", "steel"],
    "foggy": ["dark", "ghost"],
    "windy": ["dragon", "flying", "psychic"],
    "unknown": []
}

$("#submitBtn").on("click", function(event) {

    event.preventDefault()
    
    let userInput = $("#search").val().trim().toLowerCase()
    console.log(userInput)
    getPokemon(userInput)
    $("#search").val("")
})


function getLocation() {

    $("#location").html("Location unknown.")
    $("#weather").html("Weather unknown.")

    navigator.geolocation.getCurrentPosition(function(position){
        
        if (navigator.geolocation) {

            let latitude  = position.coords.latitude;
            let longitude = position.coords.longitude;

            $("location").html("Please Wait - Your Location is Loading.")

            $.get( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ latitude + "," + longitude + "&key=AIzaSyBlUXLLW6bchhS3Niw7AIrlNyOyPJSYYX8", function(data) {
                    console.log(data)
            $("#location").html(`Your location is ${data.results[4].formatted_address}`)
            }) 
            
            getWeather(latitude, longitude)
        }
    })

}

function getWeather(lat , lon) {

    let theKey = "0e1a9770bdf84bbcb4d232a7900a26e1"
    let weatherURL = "https://api.weatherbit.io/v2.0/current?key=" + theKey + "&lat=" + lat + "&lon=" + lon

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response) {

        let weatherResults = response.data
        console.log(weatherResults)
        let theWeatherCode = Number(weatherResults[0].weather.code)
        console.log(theWeatherCode)
        if (weatherCodes.hasOwnProperty(theWeatherCode)) theWeatherCondition = weatherCodes[theWeatherCode]
        $("#weather").html(`The weather in your area is currently ${theWeatherCondition}`)

    })
}
function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
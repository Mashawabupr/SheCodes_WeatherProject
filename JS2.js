//challenge1 
let info=new Date()
let day=info.getDay()
let hour=info.getHours()
if (hour<10){
  hour=`0${hour}`
}

let minute=info.getMinutes()
if (minute<10){
  minute=`0${minute}`
}

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satuday"
  ];
let all_time=`${days[day]} ${hour}:${minute}`
document.querySelector("#now").innerHTML=all_time
//FORECAST
function forecast(){
  let  forecast = document.querySelector("#forecast")
  let divForecast=`<div class="col">day<br/><span>27</span></div>`
  let i=1
  while (i<7){
  forecast.innerHTML+=divForecast
  i+=1}
}
forecast()


function showWeather(response){
  //data 
  

  //city    
  document.querySelector("#city_weather").innerHTML=`${response.data.name} , ${response.data.sys.country}`

  //gradus
  document.querySelector("#gradus").innerHTML=Math.round(response.data.main.temp)
  
  //decription
  document.querySelector("#whatIsTheWeather").innerHTML=response.data.weather[0].main
  
  //humidity
  document.querySelector("#humidity").innerHTML=` ${response.data.main.humidity}%`

  //wind
  document.querySelector("#wind").innerHTML=`${Math.round(response.data.wind.speed)} km/h`

  document.querySelector("#today").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  

  function fcelsius(event){
    event.preventDefault()
    document.querySelector("#gradus").innerHTML=Math.round(response.data.main.temp)

  }

   document.querySelector("#celsius").addEventListener("click",fcelsius)

  function ffarengeit(event){
    event.preventDefault()
    document.querySelector("#gradus").innerHTML=Math.round(response.data.main.temp*1.8+32)
  }
    document.querySelector("#farengeit").addEventListener("click",ffarengeit)
}

function search(city){
      
      
      let apiKey="2610fc391e59a1d4c413f050d38f672d"
      let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      
      
    axios.get(apiUrl).then(showWeather)}
search("Paris")




function func(event){
      event.preventDefault()
      let inputCity =document.querySelector("#city").value
 
      search(inputCity)
      
    
}

document.querySelector("#sity_search").addEventListener("click",func)


    // CURRENT
    document.querySelector("#searchCurrentPosition").addEventListener("click",func2)

    function func2(event){
      event.preventDefault() 
        navigator.geolocation.getCurrentPosition(funcOfCurrentPosition)
        function funcOfCurrentPosition(position){
      
          let apiKey="2610fc391e59a1d4c413f050d38f672d"
          let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`
          function weatherOutside(response){
            //city
              document.querySelector("#city_weather").innerHTML=response.data.name

            //gradus
              document.querySelector("#gradus").innerHTML=Math.round(response.data.main.temp)

            //description
             document.querySelector("#whatIsTheWeather").innerHTML=response.data.weather[0].main

            //humidity
              document.querySelector("#humidity").innerHTML=`Humidity: ${response.data.main.humidity}%`

            //wind
              document.querySelector("#wind").innerHTML=`Wind: ${Math.round(response.data.wind.speed)} km/h`
              document.querySelector("#today").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)



              function fcelsius(event){
                event.preventDefault()
                document.querySelector("#gradus").innerHTML=Math.round(response.data.main.temp)
            
              }
            
                document.querySelector("#celsius").addEventListener("click",fcelsius)
            
              function ffarengeit(event){
                event.preventDefault()
               document.querySelector("#gradus").innerHTML=Math.round(response.data.main.temp*1.8+32)
              }
              
            
               document.querySelector("#farengeit").addEventListener("click",ffarengeit)
            

              
            }
           
      axios.get(apiUrl).then(weatherOutside)
}
}
  
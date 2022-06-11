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
let notnull=document.querySelector("#now")
notnull.innerHTML=all_time



//challenge2
function func(){
      let infoFromInput=document.querySelector("#city")
      infoFromInput=infoFromInput.value
      
      let apiKey="2610fc391e59a1d4c413f050d38f672d"
      let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${infoFromInput}&units=metric&appid=${apiKey}`
      
      function showWeather(response){
      //data 

      //city    
      let weather=document.querySelector("#city_weather")
      weather.innerHTML=infoFromInput
      
      //gradus
      let currentWeather=Math.round(response.data.main.temp)
      let gradus=document.querySelector("#gradus")
      gradus.innerHTML=currentWeather
      
      //decription
      let sunOrClouds=response.data.weather[0].main
      let sunOrCloud=document.querySelector("#whatIsTheWeather")
          sunOrCloud.innerHTML=sunOrClouds
      
      //humidity
      let humidity=response.data.main.humidity
      let idHumidity=document.querySelector("#humidity")
      idHumidity.innerHTML=`Humidity: ${humidity}%`

      //wind
      let wind=response.data.wind.speed
      let idWind=document.querySelector("#wind")
      idWind.innerHTML=`Wind: ${Math.round(wind)} km/h`

     

    }
          
    axios.get(apiUrl).then(showWeather)
    
}
let button=document.querySelector("#sity_search")
button.addEventListener("click",func)


      //I don't know how to make it work properly((
        /*
          function fcelsius(event){
            event.preventDefault()
            let gradus=document.querySelector("#gradus")
            gradus.innerHTML=gradus.innerHTML

          }

            let celsius=document.querySelector("#celsius")
            celsius.addEventListener("click",fcelsius)

          function ffarengeit(event){
            event.preventDefault()
            let gradus2=document.querySelector("#gradus")
            gradus2.innerHTML=Math.round(gradus2.innerHTML*1.8+32)
          }
          

            let farengeit=document.querySelector("#farengeit")
            farengeit.addEventListener("click",ffarengeit)
            */

          

  

    // to get current position
    let buttonOfCurrentPosition=document.querySelector("#searchCurrentPosition")
    buttonOfCurrentPosition.addEventListener("click",func2)

    function func2(){
        navigator.geolocation.getCurrentPosition(funcOfCurrentPosition)
        function funcOfCurrentPosition(position){
          let longitude = position.coords.longitude
          let latitude=position.coords.latitude
          
          let apiKey="2610fc391e59a1d4c413f050d38f672d"
          let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          function weatherOutside(response){
            //city
              let city=response.data.name
              let myCity=document.querySelector("#city_weather")
              myCity.innerHTML=city
            //gradus
              let gradus= response.data.main.temp
              let myGradus=document.querySelector("#gradus")
              myGradus.innerHTML=Math.round(gradus)
            //description
              let description=response.data.weather[0].main
              let myDescription=document.querySelector("#whatIsTheWeather")
              myDescription.innerHTML=description
            //humidity
              let humidity=response.data.main.humidity
              let myHumidity=document.querySelector("#humidity")
              myHumidity.innerHTML=`Humidity: ${humidity}%`
            //wind
              let wind =response.data.wind.speed
              let myWind=document.querySelector("#wind")
              myWind.innerHTML=`Wind: ${Math.round(wind)} km/h`
              console.log(city,gradus,description,humidity,wind)
            }
        
     
     
     
     
     
     
     
     
      axios.get(apiUrl).then(weatherOutside)
}
}
  
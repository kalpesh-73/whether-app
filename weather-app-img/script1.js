//import dayjs from 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js';
const aqiKey="fe63a80c06b7455c8d412f7bcb9bf65e5fffbb8b";
const aqiUrl="http://api.waqi.info/feed/"
 
const apiKey="49ff60f0af428dfecb9518bbfc7380b0";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q="
//const apiUrl="https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID="

const cityName=document.querySelector(".js-cityname");
const btn=document.querySelector(".js-button");
const para=document.querySelector(".js-info");
const weatherImage=document.querySelector(".js-weather-icon")
async function airCheck(city) {
    const response=await fetch(aqiUrl + city +`/?token=`+ aqiKey);
    var dataAir =await response.json();
    console.log(dataAir);
    document.querySelector(".date").innerText=dataAir.data.time.s;
    if(dataAir.data.aqi <= 50){
   document.querySelector(".js-airpara").innerText="Air Quality: "+dataAir.data.aqi +" good air";
    }else if(dataAir.data.aqi <= 100){
   document.querySelector(".js-airpara").innerText="Air Quality: "+dataAir.data.aqi +" moderate air";
    }else if(dataAir.data.aqi <=  150){
   document.querySelector(".js-airpara").innerText="Air Quality: "+dataAir.data.aqi +" unhealthy air";
    }else if(dataAir.data.aqi >  150){
   document.querySelector(".js-airpara").innerText="Air Quality: "+dataAir.data.aqi +" unhealthy air";
    }  
}

async function checkWeather(city) {
    const response=await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data=await response.json();
    console.log(data);
    if(data.cod == 404){
        alert(`enter correct city name.`);
        document.querySelector(".city").innerHTML=`Enter the correct city`;
          document.querySelector(".date").innerHTML=``;
            document.querySelector(".temp").innerHTML=``;
              document.querySelector(".js-airpara").innerHTML=``;
                document.querySelector(".js-info").innerHTML=``;
                  document.querySelector(".city").innerHTML=`Enter the correct city`;
return
    }
        
document.querySelector(".city").innerHTML=data.name+","+data.sys.country;
document.querySelector('.temp').innerHTML=Math.round(data.main.temp)+"°c";
document.querySelector(".humidity").innerText=data.main.humidity+"%";
document.querySelector(".wind").innerText=data.wind.speed+"KM/h";
document.querySelector(".pressure").innerText=data.main.pressure+"hPa";
if(data.weather[0].main == "Clouds"){
   weatherImage.src="/weather-app-img/images/clouds.png";
   para.innerText=`${data.weather[0].description}`
}else if(data.weather[0].main == "Clear"){
    weatherImage.src="/weather-app-img/images/clear.png";
    para.innerText=`${data.weather[0].description}`
}else if(data.weather[0].main == "Rain"){
    weatherImage.src="/weather-app-img/images/rain.png";
    para.innerText=`${data.weather[0].description}`
}else if(data.weather[0].main == "Drizzle"){
    weatherImage.src="/weather-app-img/images/drizzle.png";
    para.innerText=`${data.weather[0].description}`
}else if(data.weather[0].main == "Mist"){
    weatherImage.src="/weather-app-img/images/mist.png";
    para.innerText=`${data.weather[0].description}`
}
};
btn.addEventListener("click",()=>{
checkWeather(cityName.value);
airCheck(cityName.value);
});

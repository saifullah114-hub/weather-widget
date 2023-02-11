let loc = "gurgaon";
let city = document.getElementById("cityname");
let form = document.getElementById("form");
let time = document.getElementById("time");

let currentPressure = document.getElementById("pressure");
let currentWindSpeed = document.getElementById("windspeed");
let currentTemp = document.getElementById("temperature");
let currentLoc = document.getElementById("location");
let currentHumdity = document.getElementById("humidity");
let currentHighMain = document.getElementById("high-main");
let currentLowMain = document.getElementById("low-main");

let low1 = document.getElementById("low1");
let low2 = document.getElementById("low2");
let low3 = document.getElementById("low3");
let low4 = document.getElementById("low4");
let low5 = document.getElementById("low5");

let high1 = document.getElementById("high1");
let high2 = document.getElementById("high2");
let high3 = document.getElementById("high3");
let high4 = document.getElementById("high4");
let high5 = document.getElementById("high5");

let day1 = document.getElementById("day_one");
let day2 = document.getElementById("day_two");
let day3 = document.getElementById("day_three");
let day4 = document.getElementById("day_four");
let day5 = document.getElementById("day_five");

let btn = document.getElementById("loc-btn");
let date = document.getElementById("date");

const forecastIcon1 = document.getElementById("forecast1-image");
const forecastIcon2 = document.getElementById("forecast2-image");
const forecastIcon3 = document.getElementById("forecast3-image");
const forecastIcon4 = document.getElementById("forecast4-image");
const forecastIcon5 = document.getElementById("forecast5-image");

const para = document.getElementById("error-message");
const mainIcon = document.getElementById("main-icon");

let base_url_weather = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=`;
let base_url_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=`;
const api_key = "5d2778521aa1666e3231dcf76d6af481";
const currentDate = new Date();

const changeBackground = () => {
  let hour = currentDate.getHours();
  if (8 <= hour && hour < 16) {
    document.body.className = "day";
  } else if (16 <= hour && hour < 20) {
    document.body.className = "dawn";
  } else if ((20 <= hour && hour < 24) || (hour >= 0 && hour < 5)) {
    document.body.className = "night";
  } else if (5 <= hour && hour < 8) {
    document.body.className = "dusk";
  }
};
changeBackground();
function timer() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let sec = currentTime.getSeconds();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  let t_str = hours + ":" + minutes + ":" + sec + " ";
  if (hours > 11) {
    t_str += "PM";
  } else {
    t_str += "AM";
  }
  time.innerHTML = t_str;
  setTimeout(timer, 1000);
}
timer();
date.innerHTML = currentDate.toDateString();

if (!city.value) {
  window.addEventListener("load", () => {
    loc = "gurgaon";
    fetchMainCardDetails();
    fetchForecastDetails();
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loc = city.value;
  city.value === "" ? (loc = "gurgaon") : (loc = city.value);
  base_url_weather = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=`;
  base_url_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=`;
  fetchMainCardDetails();
  fetchForecastDetails();
});

const calculateday = (localDate) => {
  return new Intl.DateTimeFormat("en-Us", { weekday: "long" }).format(
    new Date(localDate)
  );
};

const changeIcon = (cardIcon, condition) => {
  if (condition === "Clouds") {
    cardIcon.src = "../assets/icons/animation-ready/overcast.svg";
  } else if (condition === "Rain") {
    cardIcon.src = "../assets/icons/animation-ready/rain.svg";
  } else if (condition === "Sunny") {
    cardIcon.src = "../assets/icons/animation-ready/clear-day.svg";
  } else if (condition === "Snow") {
    cardIcon.src = "../assets/icons/animation-ready/snow.svg";
  } else if (condition === "Haze") {
    cardIcon.src = "../assets/icons/animation-ready/haze.svg";
  } else if (condition === "Mist") {
    cardIcon.src = "../assets/icons/animation-ready/mist.svg";
  } else if(condition==="scattered clouds"){
    cardIcon.src="../assets/icons/animation-ready/partly-cloudy-day.svg"
  }
};

const fetchMainCardDetails = () => {
  fetch(`${base_url_weather}${api_key}`)
    .then((res) => {
      if (res.status !== 200) {
        para.innerHTML = "Enter Correct Location!";
      } else {
        para.innerHTML = "";
      }
      return res.json();
    })
    .then((currentData) => {
      //destructring
      //{keyName: alias}=parentObject

      const { name: locationMain } = currentData;
      const {
        temp: tempMain,
        temp_max: highMain,
        temp_min: lowMain,
        pressure,
        humidity,
      } = currentData.main;
      const { speed: windspeed } = currentData.wind;

      //to update the html real data of id
      currentPressure.innerHTML = pressure;
      currentWindSpeed.innerHTML = windspeed;
      currentLowMain.innerHTML = `${parseInt(lowMain) - 273}&#xb0`;
      currentHighMain.innerHTML = `${parseInt(highMain) - 273}&#xb0`;
      currentHumdity.innerHTML = humidity;
      currentTemp.innerHTML = `${parseInt(tempMain) - 273}&#xb0`;
      currentLoc.innerHTML = locationMain;

      //Update Icon of main card
      changeIcon(mainIcon, currentData.weather[0].main);
    });
};
const fetchForecastDetails = () => {
  fetch(`${base_url_forecast}${api_key}`)
    .then((res) => {
      return res.json();
    })
    .then((forecastData) => {
      const arr_date_list = forecastData.list;
      const arr_dt_txt = [];
      const arr_days = [];
      for (let i = 7; i <= arr_date_list.length; i += 8) {
        arr_dt_txt.push(arr_date_list[i].dt_txt);
      }
      for (let i = 0; i < arr_dt_txt.length; i++) {
        arr_days.push(calculateday(arr_dt_txt[i]));
      }

      let day = [];
      for (let i = 0; i < 5; i++) {
        day.push(arr_days[i]);
      }

      day1.innerHTML = day[0];
      day2.innerHTML = day[1];
      day3.innerHTML = day[2];
      day4.innerHTML = day[3];
      day5.innerHTML = day[4];

      const low_cards1 = parseInt(forecastData.list[6].main.temp_min) - 273;
      const high_cards1 = parseInt(forecastData.list[6].main.temp_max) - 273;

      const low_cards2 = parseInt(forecastData.list[15].main.temp_min) - 273;
      const high_cards2 = parseInt(forecastData.list[15].main.temp_max) - 273;

      const low_cards3 = parseInt(forecastData.list[23].main.temp_min) - 273;
      const high_cards3 = parseInt(forecastData.list[23].main.temp_max) - 273;

      const low_cards4 = parseInt(forecastData.list[31].main.temp_min) - 273;
      const high_cards4 = parseInt(forecastData.list[31].main.temp_max) - 273;

      const low_cards5 = parseInt(forecastData.list[39].main.temp_min) - 273;
      const high_cards5 = parseInt(forecastData.list[39].main.temp_max) - 273;

      low1.innerHTML = low_cards1;
      low2.innerHTML = low_cards2;
      low3.innerHTML = low_cards3;
      low4.innerHTML = low_cards4;
      low5.innerHTML = low_cards5;

      high1.innerHTML = high_cards1;
      high2.innerHTML = high_cards2;
      high3.innerHTML = high_cards3;
      high4.innerHTML = high_cards4;
      high5.innerHTML = high_cards5;
      //changing Icons of next 5 days Card

      const forecastDataWeather1 = forecastData.list[7].weather[0].main;
      const forecastDataWeather2 = forecastData.list[15].weather[0].main;
      const forecastDataWeather3 = forecastData.list[23].weather[0].main;
      const forecastDataWeather4 = forecastData.list[31].weather[0].main;
      const forecastDataWeather5 = forecastData.list[39].weather[0].main;

      changeIcon(forecastIcon1, forecastDataWeather1);
      changeIcon(forecastIcon2, forecastDataWeather2);
      changeIcon(forecastIcon3, forecastDataWeather3);
      changeIcon(forecastIcon4, forecastDataWeather4);
      changeIcon(forecastIcon5, forecastDataWeather5);
    });
};

const Open_Weather_Api_Key = "ac78a7102a26fee9b6db757a65a62e40";
const GeoNameUserName = "nayan_sukhadiya";
const YTApiKey = "AIzaSyB3nzl255F46T4aSlQ5EQ3t4nALKA27S6A";
let searchBtn = document.querySelector(".submit-button");
let cityNameBar = document.querySelector(".SearchBar");
const resultsList = document.getElementById("results");
let SearchMain = document.querySelector(".SerchBoxContainer");
function mainPageLoad() {
  document.querySelector(".mainLoader").style.opacity = 0;
}
setTimeout(mainPageLoad, 2000);
function mainPageLoad1() {
  document.querySelector(".mainLoader").style.display = "none";
}
setTimeout(mainPageLoad1, 2500);



function SearchBtn() {
  let cityName = cityNameBar.value;
  if (cityName === "") {
    alert("Please enter the city name");
  } else {
    getCityCoordinates(cityName);
    let name = cityName;
    photos(name);
  }
  document
    .querySelector(".SearchInput-group")
    .classList.remove("SearchInputActive");
  document.querySelector(".slideshow-container").style.display = "block";
  resultsList.style.display = "none";
  if (SearchMain.classList.contains("searchBoxActive")) {
    function mainPageLoad() {
      SearchMain.classList.remove("searchBoxActive");
      document.querySelector(".main").style.display = "block";
      document.querySelector(".header").style.display = "flex";
      document.querySelector(".slideshow-container ").style.display = "block";
      document.querySelector(".SearchActiveLogo").style.display = "none";
      document.querySelector("#greetings").style.display = "none";
      document.querySelector(".SearchBtn").style.display = "none";
    }
    setTimeout(mainPageLoad, 2000);
  }

  document.querySelector(".serchIcon").style.opacity = "0";
  document.querySelector(".loader").style.opacity = "1";
  setTimeout(function () {
    document.querySelector(".loader").style.opacity = "0";
    document.querySelector(".serchIcon").style.opacity = "1";
  }, 2100); 
}
cityNameBar.addEventListener("keypress", function (event) {
  if (window.scrollY !== 0) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  if (event.key === "Enter") {
    let cityName = cityNameBar.value;
    if (cityName === "") {
      alert("Please enter the city name");
    } else {
      getCityCoordinates(cityName);
      let name = cityName;
      photos(name);
    }
    document
      .querySelector(".SearchInput-group")
      .classList.remove("SearchInputActive");
    resultsList.style.display = "none";
    if (SearchMain.classList.contains("searchBoxActive")) {
      function mainPageLoad() {
        SearchMain.classList.remove("searchBoxActive");
        document.querySelector(".main").style.display = "block";
        document.querySelector(".header").style.display = "flex";
        document.querySelector(".slideshow-container ").style.display = "block";
        document.querySelector(".SearchActiveLogo").style.display = "none";
        document.querySelector("#greetings").style.display = "none";
        document.querySelector(".SearchBtn").style.display = "none";
      }
      setTimeout(mainPageLoad, 2000);
    }

    document.querySelector(".serchIcon").style.opacity = "0";
    document.querySelector(".loader").style.opacity = "1";
    setTimeout(function () {
      document.querySelector(".loader").style.opacity = "0";
      document.querySelector(".serchIcon").style.opacity = "1";
    }, 2100);
  }
});

cityNameBar.addEventListener("input", function () {
  const query = this.value.trim();
  if (query.length === 0) {
    resultsList.innerHTML = "";
    return;
  }

  fetch(
    `https://secure.geonames.org/searchJSON?q=${query}&maxRows=8&username=${GeoNameUserName}`
  )
    .then((response) => response.json())
    .then((data) => {
      resultsList.innerHTML = "";
      resultsList.style.display = "block";
      document
        .querySelector(".SearchInput-group")
        .classList.add("SearchInputActive");
      data.geonames.forEach((location) => {
        const listItem = document.createElement("button");
        listItem.textContent = `${location.name}, ${location.countryName}`;
        listItem.addEventListener("click", function () {
          cityNameBar.value = location.name;
          resultsList.innerHTML = "";
          cityNameBar.focus();
          resultsList.style.display = "none";
        });
        resultsList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

const getCityCoordinates = (CityName) => {
  const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${CityName}&limit=1&appid=${Open_Weather_Api_Key}`;

  fetch(GEOCODING_API_URL)
    .then((response) => response.json())
    .then((data) => {
      if (!data.length) {
        alert(`No coordinates found for ${CityName}`);
      } else {
        const { lat, lon, state, country } = data[0];
        let { name } = data[0];
        if (name === "New York County") {
          name = "New York";
        }
        mapCoordination(lat, lon, name, state);
        dem(name);
        fetchCityDetails(name);
        detailCards(name, state, country);
        CityWikiDetail(name);
        CurrentWeather(lat, lon);
        getWeatherDetails(lat, lon);
        GetHotel(lat, lon);
        MorePhotos(name);
        YtVideo(name, country);
        news(name);
      }
    });
};
const detailCards = (name, state, country) => {
  document.querySelector(".moreDetail").innerHTML = `
  <a href="https://www.youtube.com/results?search_query=${name}" target="_blank" title="More Video of ${name}" class="ytDetail moreDetailInnerPart">
  <p class="ytMoreDetail">More Video of <span class="MoreDetailCityName">${name}</span> on YouTube</p>
  <img loading="lazy" src="./img/detail_card/yt.png" alt="" class="moreImg">
  </a>
  <a href="https://www.google.com/search?q=${name}" target="_blank" title="More Detail of ${name}" class="googleDetail moreDetailInnerPart">
  <p class="googleMoreDetail">More detail about <span class="MoreDetailCityName">${name}</span> on Google</p>
  <img loading="lazy" src="./img/detail_card/google.png" alt="" class="moreImg">
  </a>
  <a href="https://www.google.com/maps/place/${name}"  target="_blank"  class="MapDetail moreDetailInnerPart">
  <p class="MapMoreDetail">View <span class="MoreDetailCityName">${name}</span> on Google Map</p>
  <img loading="lazy" src="./img/detail_card/map.png" alt="" class="moreImg">
  </a>
  <a href="https://en.wikipedia.org/wiki/${name}" target="_blank"   class="WikiDetail moreDetailInnerPart">
  <p class="wikiMoreDetail">More detail about <span class="MoreDetailCityName">${name}</span> on wikipedia</p>
  <img loading="lazy" src="./img/detail_card/wikipedia.png" alt="" class="moreImg">
  </a>
  <a href="https://www.pexels.com/search/${name}/" target="_blank" class="pexelsDetail moreDetailInnerPart">
  <p class="pexelsMoreDetail">More Image about <span class="MoreDetailCityName">${name}</span> on Pexels</p>
  <img loading="lazy" src="./img/detail_card/pexels.png" alt="" class="moreImg">
  </a>
  <a href="https://www.istockphoto.com/search/2/image-film?phrase=${name}" target="_blank" class="istockDetail moreDetailInnerPart">
  <p class="istockMoreDetail">More Image about <span class="MoreDetailCityName">${name}</span> on iStock</p>
  <img loading="lazy" src="./img/detail_card/istock.png" alt="" class="moreImg">
  </a>
  <a href="https://www.shutterstock.com/search/${name}" target="_blank" class="sufferDetail moreDetailInnerPart">
  <p class="sufferMoreDetail">More Image about <span class="MoreDetailCityName">${name}</span> on sufferstock</p>
  <img loading="lazy" src="./img/detail_card/suffer.png" alt="" class="moreImg">
  </a>
  <a href="https://unsplash.com/s/photos/${name}" target="_blank" class="unplashDetail moreDetailInnerPart">
  <p class="unplashMoreDetail">More Image about <span class="MoreDetailCityName">${name}</span> on UnPlash</p>
  <img loading="lazy" src="./img/detail_card/unplash.png" alt="" class="moreImg">
  </a>`;

  const flagUrl = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${country.toLowerCase()}.svg`;
  if (state === undefined) {
    document.querySelector(".photo-detail").innerHTML = `
<h1>${name}</h1>
<p>${country}  <img loading="lazy" id="flagImage" src="${flagUrl}" alt="Flag"></p>`;
  } else {
    document.querySelector(".photo-detail").innerHTML = `
<h1>${name}</h1>
<p>${state}, ${country}  <img loading="lazy" id="flagImage" src="${flagUrl}" alt="Flag"></p>`;
  }
};

const news = (name) => {
  const apiKey1 = "844a302cf22646e98dbcc8b563fa009b";
  const NewsUrl = `https://newsdata.io/api/1/news?apikey=pub_43832fdeca85e0e515bdd23ad17fde9177e5a&q=$${name}`;

  fetch(NewsUrl)
    .then((response) => response.json())
    .then((data) => {
      let news = data.results.image_url;
      let cardCreate = "";
      for (let card of data.results) {
        let pubDate = new Date(card.pubDate);
        let formattedDate = `${pubDate
          .getDate()
          .toString()
          .padStart(2, "0")}-${(pubDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${pubDate.getFullYear()}`;
        cardCreate += `<a href="${card.link}" class="news-card cardS"  title="${card.title}">
          <div class="img-news">
            <img loading="lazy" src="${card.image_url}" onerror="this.onerror=null; this.src='./img/nsLink.png';">
          </div>
          <div class="author">
            <div class="author-img">
              <div class="dp"></div>
              <img loading="lazy" src="${card.source_icon}" onerror="this.onerror=null; this.src='./img/dp.png';">
            </div>
            <h3 class="AuthorName" title="${card.source_id}">${card.source_id}</h3>
          </div>
          <h2>${card.title}</h2>
          <div class="bottom-part">
            <h4><svg  viewBox="0 0 24 24"><path fill="#fff" d="M12 21q-1.858 0-3.5-.71q-1.642-.711-2.86-1.93T3.71 15.5T3 12q0-1.864.71-3.503q.711-1.64 1.93-2.857T8.5 3.71Q10.142 3 12 3q1.864 0 3.503.71q1.64.711 2.858 1.93t1.929 2.857Q21 10.137 21 12q0 1.858-.71 3.5q-.711 1.642-1.93 2.86t-2.857 1.93T12 21m0-.992q.88-1.131 1.452-2.221q.571-1.09.929-2.44H9.619q.397 1.426.948 2.516q.552 1.09 1.433 2.145m-1.273-.15q-.7-.825-1.278-2.04q-.578-1.214-.86-2.472H4.754q.86 1.865 2.437 3.06q1.578 1.194 3.536 1.452m2.546 0q1.958-.258 3.536-1.452q1.577-1.195 2.437-3.06h-3.834q-.38 1.277-.957 2.491q-.578 1.215-1.182 2.02m-8.927-5.51h4.035q-.114-.616-.16-1.2q-.048-.583-.048-1.147t.047-1.147t.16-1.2H4.347q-.163.52-.255 1.133Q4 11.398 4 12t.091 1.215t.255 1.131m5.035 0h5.238q.114-.615.16-1.18q.048-.564.048-1.166t-.047-1.166t-.16-1.18H9.38q-.113.615-.16 1.18q-.047.564-.047 1.166t.047 1.166t.16 1.18m6.24 0h4.034q.163-.519.255-1.131Q20 12.602 20 12t-.091-1.215t-.255-1.131h-4.035q.114.615.16 1.199q.048.584.048 1.147t-.047 1.147t-.16 1.2m-.208-5.693h3.834q-.879-1.904-2.408-3.06t-3.565-1.471q.7.921 1.259 2.107q.559 1.185.88 2.424m-5.793 0h4.762q-.396-1.408-.977-2.546T12 3.992q-.823.977-1.404 2.116T9.62 8.654m-4.865 0h3.834q.321-1.238.88-2.424t1.259-2.107q-2.054.316-3.574 1.48q-1.52 1.166-2.4 3.05"/></svg>${card.language}</h4>
            <h4 class="date"><svg viewBox="0 0 24 24"><g fill="none"><path fill="#d1d1d1" d="M2 9c0-1.886 0-2.828.586-3.414C3.172 5 4.114 5 6 5h12c1.886 0 2.828 0 3.414.586C22 6.172 22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9m0 9c0 1.886 0 2.828.586 3.414C3.172 22 4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586C22 20.828 22 19.886 22 18v-5c0-.471 0-.707-.146-.854C21.707 12 21.47 12 21 12H3c-.471 0-.707 0-.854.146C2 12.293 2 12.53 2 13z"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M7 3v3m10-3v3"/></g></svg>${formattedDate}</h4>
          </div>
        </a>`;
      }
      document.querySelector(".news-card-section").innerHTML = cardCreate;
    })

    .catch((error) => {
      console.error("There was a problem fetching the news data:", error);
    });
};

const photos = (name) => {
  const filter = `${name} city, ${name} wallpaper,${name} 4k wallpaper, ${name} popular buildings bridge, ${name} Skyline, ${name} mountain beach lake river stadium monument, ${name} place -boat -silhouette -church -temple -mosque -synagogue -man -women -religious -trees`;
  const MobileUrl = `https://api.pexels.com/v1/search?query=${filter}&orientation=portrait&per_page=3&popular=true`;
  const apiKey = "BU5cJwIcFaqDMGtdpQe2maXoaGiOnJcPQeV6nbkZcG2Le5189xZWBz1s";
  const url = `https://api.pexels.com/v1/search?query=${filter}&orientation=landscape&per_page=3&popular=true`;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    fetch(MobileUrl, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        let a = data.photos;
        let slider = ``;
        for (let slide of a) {
          slider += `
          <div class="mySlides fade">
          <div class="banner-detail">
          <h1>${slide.alt}  </h1>
        </div>
        <img class="small" src="${slide.src.tiny}">
        <img class="large" src="${slide.src.original}">
        </div>`;
        }
        document.querySelector(".in-slideshow-container").innerHTML = slider;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else {
    fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        let a = data.photos;
        let slider = ``;
        for (let slide of a) {
          slider += `
          <div class="mySlides fade">
          <div class="banner-detail">
          <h1>${slide.alt}  </h1>
        </div>
        <img class="small" src="${slide.src.tiny}">
        <img loading="lazy" class="large" src="${slide.src.original}">
        </div>`;
        }
        document.querySelector(".in-slideshow-container").innerHTML = slider;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
};

const MorePhotos = (name) => {
  const PhotosFilter = `${name} city, ${name} wallpaper,${name} place -boat -silhouette -church -temple -mosque -synagogue -man -women -religious -trees`;
  const apiKey = "BU5cJwIcFaqDMGtdpQe2maXoaGiOnJcPQeV6nbkZcG2Le5189xZWBz1s";
  const Photos = `https://api.pexels.com/v1/search?query=${PhotosFilter}&per_page=5&popular=true`;

  fetch(Photos, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((res) => res.json())
    .then((PhotosData) => {
      let a = PhotosData.photos;
      let imgCard = ``;
      for (let b of a) {
        imgCard += `
        <div class="photoDiv"><img loading="lazy" src="${b.src.original}">
        <p><svg viewBox="0 0 24 24">
            <g fill="#d1d1d1" fill-rule="evenodd" clip-rule="evenodd">
              <path
                d="M7.25 10a4.75 4.75 0 1 1 9.5 0a4.75 4.75 0 0 1-9.5 0M12 6.75a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5">
              </path>
              <path
                d="M3.524 8.857a8.288 8.288 0 0 1 8.26-7.607h.432a8.288 8.288 0 0 1 8.26 7.607a8.944 8.944 0 0 1-1.99 6.396l-4.793 5.861a2.187 2.187 0 0 1-3.386 0l-4.793-5.861a8.943 8.943 0 0 1-1.99-6.396m8.26-6.107A6.788 6.788 0 0 0 5.02 8.98a7.443 7.443 0 0 0 1.656 5.323l4.793 5.862a.687.687 0 0 0 1.064 0l4.793-5.862A7.443 7.443 0 0 0 18.98 8.98a6.788 6.788 0 0 0-6.765-6.23z">
              </path>
            </g>
          </svg> ${b.alt}  </p>
      </div>`;
      }
      document.querySelector(".imgSectionPhotos").innerHTML = imgCard;
    });
};

const mapCoordination = (lat, lon, name, state) => {
  let map;
  function loadMapScenario() {
    map = new Microsoft.Maps.Map("#myMap", {
      credentials:
        "AtRpXiSIPHgN5ROpHoHL4le6jIAXXZmw3fLg3zMGz50M_BHkQwK5NoxVa8DrPgwL", // Replace with your Bing Maps API key
      center: new Microsoft.Maps.Location(lat, lon),
      // center: new Microsoft.Maps.Location(40.7128, -74.006), 1// Use the provided latitude and longitude
      zoom: 13,
      mapTypeId: Microsoft.Maps.MapTypeId.canvasLight, // Set the map type to canvasLight for blue color
      showZoomButtons: true, // Show zoom buttons
      showLocateMeButton: false, // Show the "Locate Me" button
      customMapStyle:{
        "version": "1.0",
        "settings": {
          "landColor": "#e7e6e5",
          "shadedReliefVisible": false
        },
        "elements": {
          "vegetation": {
            "fillColor": "#c5dea2"
          },
          "naturalPoint": {
            "visible": false,
            "labelVisible": false
          },
          "transportation": {
            "labelOutlineColor": "transparent",
            "fillColor": "#ffffff",
            "strokeColor": "#ffffff"
          },
          "water": {
            "fillColor": "#b1bdd6",
            "labelColor": "#ff6f59",
            "labelOutlineColor": "transparent"
          },
          "structure": {
            "fillColor": "#d7d6d5"
          },
          "indigenousPeoplesReserve": {
            "visible": false
          },
          "military": {
            "visible": false
          },
          "highway": {
            "strokeColor": "#ff6f59",
            "fillColor": "#ffffff"
          },
          "controlledAccessHighway": {
            "strokeColor": "#ff6f59",
            "fillColor": "#ffffff"
          },
          "arterialRoad": {
            "strokeColor": "#ff6f59",
            "fillColor": "#FF7A42"
          },
          "majorRoad": {
            "strokeColor": "#ff6f59",
            "fillColor": "#FF7A42"
          }
        }
      },      
    });

    // Add a marker
    const center = map.getCenter();
    const pin = new Microsoft.Maps.Pushpin(center, {
      title: name,
      subTitle: state,
      color: "#ff6f59",
    });
    map.entities.push(pin);
  }
  loadMapScenario();
};

const CurrentWeather = (lat, lon) => {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Open_Weather_Api_Key}&units=metric`;
  fetch(currentUrl)
    .then((res) => res.json())
    .then((WeatherData) => {
      function convertUnixToTime(unixTimestamp, timezoneOffset) {
        const date = new Date(unixTimestamp * 1000);
        const localTime = new Date(date.getTime() + timezoneOffset * 1000);
        const hours = String(localTime.getUTCHours()).padStart(2, "0");
        const minutes = String(localTime.getUTCMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      }
      const sunriseTimestamp = WeatherData.sys.sunrise;
const sunsetTimestamp = WeatherData.sys.sunset;
const timezoneOffset = WeatherData.timezone;

const sunriseTime = convertUnixToTime(sunriseTimestamp, timezoneOffset);
const sunsetTime = convertUnixToTime(sunsetTimestamp, timezoneOffset);

      document.getElementById("CurrentTemp").innerHTML = Math.floor(WeatherData.main.temp) + "&deg;";
      document.getElementById("highTemp").innerHTML = Math.floor(WeatherData.main.temp_min) + "&deg;";
      document.getElementById("lowTemp").innerHTML = Math.floor(WeatherData.main.temp_max) + "&deg;";
      document.getElementById("Humidity").innerHTML = WeatherData.main.humidity;
      document.getElementById("Wind").innerHTML = WeatherData.wind.speed + "m/s";
      document.getElementById("visibility").innerHTML = WeatherData.visibility;
      document.getElementById("pressure").innerHTML = WeatherData.main.pressure;
      document.getElementById("Sunrise").innerHTML = sunriseTime;
      document.getElementById("Sunset").innerHTML = sunsetTime;
    });
};

const getWeatherDetails = (lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${Open_Weather_Api_Key}&units=metric`;
  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((weather) => {
      const { temp, temp_max, temp_min, feels_like } = weather.list[0].main;
      const WeatherIcon = weather.list[0].weather[0].icon;
      const cond = weather.list[0].weather[0].description;
      const Celc = ((temp - 32) * 5) / 9;
      document.querySelector(
        ".MainWeatherIcon"
      ).src = `./svg/weather/${weather.list[0].weather[0].id}${WeatherIcon}.svg`;
      document.querySelector(
        ".main-detail"
      ).innerHTML = ` <h1 class="temp">${Math.round(temp)}&deg;c</h1>
<p class="cond">${cond}</p>`;

      let ta = ``;
      for (let cardDataS of weather.list) {
        let a = cardDataS.dt_txt;
        let b = a.split(" ");
        let Time = b[1].slice(0, 5);
        let d = b[0].split("-");
        let e = d.reverse();
        let Date = e.join("-");

        ta += `
    <tr>
    <td class="date">${Date}</td>
    <td class="time">${Time}</td>
    <td class="mainIcon"><img loading="lazy" src="./svg/weather/${
      cardDataS.weather[0].id
    }${cardDataS.weather[0].icon}.svg" alt="" class="MainWeatherIcon"></td>
    <td class="temp">${Math.round(cardDataS.main.temp)} &deg;c</td>
    <td class="minMax"><img loading="lazy" src="svg/pressure-high.svg" alt="">  ${Math.round(
      cardDataS.main.temp
    )} &deg;c  <img loading="lazy" src="svg/pressure-low.svg" alt=""> ${Math.round(
          cardDataS.main.temp
        )} &deg;c</td>
    <td class="des">${cardDataS.weather[0].description}</td>
    <td class="windIcon"><div class="degreeSet" style="transform: rotate(${
      cardDataS.wind.deg
    }deg);max-height: 28px;width: 30px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M8.037 9.858a.5.5 0 0 0-.68.243l-4.193 9.402c-.667 1.496.815 3.047 2.202 2.306l5.904-3.152c.46-.245 1-.245 1.459 0l5.904 3.152c1.387.741 2.869-.81 2.202-2.306l-1.572-3.524a2 2 0 0 0-.932-.975z"></path>
        <path fill="currentColor" d="M8.61 8.467a.5.5 0 0 1-.234-.65l2.151-4.823c.59-1.324 2.355-1.324 2.945 0l3.968 8.898a.5.5 0 0 1-.68.65z" opacity="0.5"></path>
      </svg>
    </div></td>
    <td class="Deg">${cardDataS.wind.deg}&deg;</td>
    <td class="speed">${cardDataS.wind.speed} m/s</td>
    <td class="gust">${cardDataS.wind.gust} m/s</td>
    <td class="humidity">${cardDataS.main.humidity} m/s</td>
  </tr>`;
      }
      document.querySelector(".table-detail").innerHTML = ta;
    })
    .catch(() => {
      console.log("An error occurred while fetching the forecast");
    });
};

const YtVideo = (name, country) => {
  const YTContainer = document.querySelector(".yt-video-container");
  fetch(
    `https://youtube-v2.p.rapidapi.com/search/?query=${encodeURIComponent(
      name
    )}&lang=en&order_by=this_week&country=${country}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "67e97149b7msh7f095fdb1e793cep17e98cjsn4f58f7f2c3bb",
        "X-RapidAPI-Host": "youtube-v2.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const playableVideos = data.videos.filter(
        (item) => item.videoAvailability !== "none"
      );

      if (playableVideos.length === 0) {
        return;
      }
      let ytCardsHTML = "";
      for (let item of playableVideos) {
        ytCardsHTML += `
                    <div class="ytCards cardS">
          <iframe src="https://www.youtube.com/embed/${item.video_id}" frameborder="0" allowfullscreen></iframe>
          <img loading="lazy" class="ytThumbnil" src="${item.thumbnails[0].url}" alt="">
          <p class="video_length">${item.video_length}</p>
          <div class="videoDetail">
          <p style="font-size: 12px;">${item.author}</p>
            <h1 class="videoTitle">${item.title}</h1>
            <div class="viewAndTime">
              <p class="views">${item.number_of_views} views</p>
              <p class="videoTime">${item.published_time}</p>
            </div>
          </div>
        </div>
                    
                    `;
      }
      YTContainer.innerHTML = ytCardsHTML;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

function fetchCityDetails(name) {
  let topics = [
    "infrastructure",
    "sport team",
    "Economy",
    "sport stadium",
    "public transport",
    "high speed",
    "attraction",
    "Government city",
    "tourism attraction",
    "railway",
    "city police",
    "hospital",
  ];
  for (let i = 0; i < topics.length; i++) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&-movie&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=25&srsearch=${name}${topics[i]}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let linkCardSection = "";
        const searchResults = data.query.search;

        for (a of data.query.search) {
          let title = a.title;
          let pageId = a.pageid;

          fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${a.title}`)
            .then((res) => res.json())
            .then((summaryData) => {
              let imageUrl = summaryData.thumbnail
                ? summaryData.thumbnail.source
                : "";
              let linkCard = `
            <a href="https://en.wikipedia.org/?curid=${pageId}" target="_blank" class="linkCard">
            <div class="linkImg-section">
              <img loading="lazy" src="${imageUrl}" alt="${title}" onerror="this.onerror=null; this.src='./img/nsLink.png';">
              </div>
              <div class="linkDetail">
                <h1>${title}</h1>
              </div>
            </a>`;
              linkCardSection += linkCard;
              document.querySelector(".linkCardSection").innerHTML =
                linkCardSection;
            })
            .catch((error) => {
              console.error(
                `Error fetching summary for page ID ${pageId}:`,
                error
              );
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}

function dem(name) {
  const url = `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(
    name
  )}&maxRows=1&username=${GeoNameUserName}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.totalResultsCount > 0) {
        const city = data.geonames[0];
        const population = city.population;
        const populationDensity = 10000;
        let number = 5638700;
        let formattedNumber = population.toLocaleString("en-IN");
        const areaInSqKm = population / populationDensity;
        let a = areaInSqKm.toFixed(2) + " sq km";
        document.querySelector(".longitude").innerHTML = data.geonames[0].lng;
        document.querySelector(".latitude").innerHTML = data.geonames[0].lat;
        document.querySelector(".area").innerHTML = a;
        document.querySelector(".population").innerHTML = formattedNumber;
      } else {
        alert("City not found");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function fetchCityInfo(name) {
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${name}`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const extract = data.extract;
      document.querySelector(
        ".cityDetail"
      ).innerHTML = `<h2>Summary Of ${name}</h2><br>${extract}`;
    })
    .catch((error) => {
      console.error("There was a problem fetching city data:", error);
    });
}

const CityWikiDetail = (name) => {
  if (name === "New York") {
    name = "New York City";
  }

  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${name}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.querySelector(".cityDetail").innerHTML = `
    <h3 class="beforeSplit">${data.extract}</h3>
`;
    })
    .catch((error) => {
      console.error("There was a problem fetching city data:", error);
    });

  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/History_of_${name}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".HistoryCityInfo").innerHTML = `
      <h3 class="beforeSplit">${data.extract}
      <a href="${data.content_urls.desktop.page}" target="_blank" class="moreDetailWiki">
        <h5>Read More...</h5> 
      </a></h3>
  `;
    });

  fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/Demographics_of_${name}`
  )
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".DemographicsCityInfo").innerHTML = `
      <h3 class="beforeSplit">${data.extract}
      <a href="${data.content_urls.desktop.page}" target="_blank" class="moreDetailWiki">
        <h5>Read More...</h5> 
      </a></h3>
  `;
    });

  fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/Geography_of_${name}`
  )
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".GeographyCityInfo").innerHTML = `
      <h3 class="beforeSplit">${data.extract}
      <a href="${data.content_urls.desktop.page}" target="_blank" class="moreDetailWiki">
        <h5>Read More...</h5> 
      </a></h3>
  `;
    });

  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/Economy_of_${name}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".EconomyCityInfo").innerHTML = `
      <h3 class="beforeSplit">${data.extract}
      <a href="${data.content_urls.desktop.page}" target="_blank" class="moreDetailWiki">
        <h5>Read More...</h5> 
      </a></h3>
  `;
    });

  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${name}_Airport`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".AirportCityInfo").innerHTML = `
      <h3 class="beforeSplit">${data.extract}
      <a href="${data.content_urls.desktop.page}" target="_blank" class="moreDetailWiki">
        <h5>Read More...</h5> 
      </a></h3>
  `;
    });
  document.querySelectorAll(".cityWikiInfoCard").forEach(function (element) {
    element.classList.add("gsapInfoAnimation");
  });
};


const GetHotel = (lat, lon) => {
  let today = new Date();
  let futureDate1 = new Date(today);
  let futureDate2 = new Date(today);
  futureDate1.setDate(today.getDate() + 2);
  futureDate2.setDate(today.getDate() + 3);
  function formatDate(date) {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  let checkIn = formatDate(futureDate1);
  let checkOut = formatDate(futureDate2);
  function RatingSystemDynamic(num) {
    let intRating = Math.floor(num);
    let FactorialRating = num - intRating;
    let RatingArray = [0, 0, 0, 0, 0];

    for (let i = 0; i < intRating; i++) {
      RatingArray[i] = 1;
    }
    if (FactorialRating < 5) {
      RatingArray[intRating] = FactorialRating;
    }
    return RatingArray;
  }

  function RatingSystemHtml(num) {
    let RatingArray = RatingSystemDynamic(num);
    let ratingCard = ``;
    for (let i = 0; i < 5; i++) {
      ratingCard += `<div class="circle">
    <span style="width : ${RatingArray[i] * 100}%"></span>
</div>`;
    }
    return ratingCard;
  }
  fetch(
    `https://booking-com.p.rapidapi.com/v2/hotels/search-by-coordinates?checkin_date=${checkIn}&room_number=1&checkout_date=${checkOut}&latitude=${lat}&adults_number=1&units=metric&filter_by_currency=INR&order_by=class_descending&locale=en-gb&longitude=${lon}&page_number=0&children_number=2&include_adjacency=true&children_ages=5%2C0&class=5&price_filter=1`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "67e97149b7msh7f095fdb1e793cep17e98cjsn4f58f7f2c3bb",
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let img = ``;
      for (a of data.results) {
        let modifiedUrl = a.photoMainUrl.replace("400x800", "max1024x768");
        img += `<div class="hotel-box cardS"><div class="img-box"><img loading="lazy" src ="${modifiedUrl}"></div>
                    <p class="hotelName">${a.name}</p>
                    <div class="rating-section">
                        <div class="rating-system">${RatingSystemHtml(
                          a.reviewScore / 2
                        )} </div><p>${a.reviewCount}</p>
                        </div>
                    <p class="hotelPrice">${a.priceDetails.gross}/night</p>
                    <p style="font-size: 10px;">${a.priceDetails.taxInfo}</p>
                    <p class="hotelRating"> ${a.reviewScore / 2}</p>
                    </div>`;
      }
      document.querySelector(".hotel-img-section").innerHTML = img;
      gsapAnim()
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
 

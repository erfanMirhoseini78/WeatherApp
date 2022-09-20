const inputElem = document.querySelector('input');
const errorElem = document.querySelector('.error');

let apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '6cbb6c4aba4e735452bdc5d742a16aa4'
}

function fetchData() {
    let countryValue = inputElem.value;

    fetch(`${apiData.url}${countryValue}&appid=${apiData.key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            showData(data);
        })
        .catch(() => {
            errorElem.innerHTML = "Please don't be ridiculous !";
        })
}

function showData(data) {
    let cityElem = document.querySelector('.city');
    cityElem.innerHTML = `${data.name}, ${data.sys.country}`;

    let dateElem = document.querySelector('.date');
    dateElem.innerHTML = showDate();

    let timeElem = document.querySelector('.time');
    timeElem.innerHTML = showTime();

    let tempElem = document.querySelector('.temp');
    tempElem.innerHTML = `${Math.floor(data.main.temp - 273.15)}°c`;

    let weatherElem = document.querySelector('.weather');
    weatherElem.innerHTML = `${data.weather[0].main}`;

    let tempsElem = document.querySelector('.hi-low');
    tempsElem.innerHTML = `${Math.floor(data.main.temp_min - 273.15)}°c / ${Math.floor(data.main.temp_max - 273.15)}°c`;
}

function showDate() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let now = new Date();

    let day = days[now.getDay()];
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    let date = now.getDate();

    return `${day} ${date} ${month} ${year}`;
}

function showTime() {
    let now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    return `${hour} : ${minute} : ${second}`;
}

inputElem.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        fetchData();
        inputElem.value = '';
        errorElem.innerHTML = '';
    }
})
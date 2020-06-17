const apiKey = "dcc3bed87131d7b289c43bf541a95657";

/* данные о городах */
const cities = [
    {
        id: 518970,
        name: "Новочеркасск",
        country: "Россия",
        capital: "Москва",
        description:
            "Город в Ростовской области является городом областного значения со статусом городского округа. Население — 167 355чел. (2019), площадь городского округа составляет более 13,5 тыс. га.",
        coord: {
            lon: 40.093887,
            lat: 47.418056
        }
    },
    {
        id: 524901,
        name: "Москва",
        country: "Россия",
        capital: "Москва",
        description:
            "Столица России, крупнейший по численности населения город России и её субъект — 12 692 466чел. (2020), самый населённый из городов, полностью расположенных в Европе, входит в десятку городов мира по численности населения, крупнейший русскоязычный город в мире. Центр Московской городской агломерации. Центр Русской православной церкви.",
        coord: {
            lon: 37.615555,
            lat: 55.75222
        }
    },
    {
        id: 491422,
        name: "Сочи",
        country: "Россия",
        capital: "Москва",
        description:
            "Город в России, расположен на северо-восточном побережье Чёрного моря (Черноморское побережье России) в Краснодарском крае, на расстоянии 1620 км от Москвы. Административный центр муниципального образования город-курорт Сочи.",
        coord: {
            lon: 39.730278,
            lat: 43.599998
        }
    },
    {
        id: 4350049,
        name: "Калифорния",
        country: "США",
        capital: "Вашингтон",
        description:
            "Калифорния — самый населённый штат США (как по результатам переписи населения, так и по оценкам 2008 года) и 3-й по площади (после Аляски и Техаса). Столица — Сакраменто, крупнейший город — Лос-Анджелес.",
        coord: {
            lon: -76.507446,
            lat: 38.3004
        }
    },
    {
        id: 703448,
        name: "Киев",
        country: "Украина",
        capital: "Киев",
        description:
            "Cтолица и крупнейший город Украины. Расположен на реке Днепре, является центром Киевской агломерации. Отдельная административно-территориальная единица Украины; культурный, политический, социально-экономический, транспортный, научный и религиозный центр страны.",
        coord: {
            lon: 30.516666,
            lat: 50.433334
        }
    },
    {
        id: 3941584,
        name: "Куско",
        country: "Перу",
        capital: "Лима",
        description:
            "Город на юго-востоке Перу, административный центр региона Куско и одноимённой провинции. Население — 428 450 человек (2017).",
        coord: {
            lon: -71.978058,
            lat: -13.51833
        }
    },
    {
        id: 5914894,
        name: "Канмор",
        country: "Канада",
        capital: "Оттава",
        description:
            "Город на юго-западе провинции Альберта (Канада) с постоянным населением 12 005 человек (по результатам муниципальной переписи 2008 года). Ещё 5567 человек, что составляет 31,6 % от общего населения, не живут в Кэнморе постоянно.",
        coord: {
            lon: -115.352058,
            lat: 51.083351
        }
    },
    {
        id: 1283240,
        name: "Катманду",
        country: "Непал",
        capital: "Катманду",
        description:
            "Горная долина Катманду, высотой около 1300 м, — историческая область Непала, знаменитая неварскими городами Катманду, Лалитпур (Патан), Бхактапур, Киртипур, Панаути и многочисленными монастырями, храмовыми центрами и культурными памятниками.",
        coord: {
            lon: 85.316666,
            lat: 27.716667
        }
    }
];
/* **** */

/* кэш */
const cacheDom = new Map();
function getElement(selector) {
    if (cacheDom.has(selector)) {
        return cacheDom.get(selector);
    }
    const domElement = document.querySelector(selector);
    domElement && cacheDom.set(selector, domElement);
    return domElement;
}
/* **** */

/* конвертер unix-времени*/
function replaceTime(unixTime, useToDate) {
    let convertTime = "";
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    const minutes = `0${date.getMinutes()}`;
    const seconds = `0${date.getSeconds()}`;
    if (useToDate === true) {
        const months = [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июнь",
            "Июль",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек"
        ];
        const year = date.getFullYear();
        const day = date.getDate();
        const month = months[date.getMonth()];
        convertTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(
            -2
        )}, ${day}-${month}-${year}`;
        return convertTime;
    }
    convertTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    return convertTime;
}
/* ************ */

/* инициализация яндекс карты + метка */
function initYandexMap(latitude, longitude) {
    const myMap = new ymaps.Map(getElement(".map"), {
        center: [latitude, longitude],
        zoom: 10
    });
    const myPlacemark = new ymaps.Placemark([latitude, longitude]);
    myMap.geoObjects.add(myPlacemark);
}
/* ************ */

const generateTemplateWeather = (item, capital, description, country) => `
    <div class="country" data-country="${item.sys.country}" data-id="${
    item.id
}" data-city="${item.name}">
        <div class="wrapper-inside">
            <div>
                <img class="weather-img" src="https://openweathermap.org/img/wn/${
                    item.weather[0].icon
                }@2x.png" alt="Weather ${item.name}" >
            </div>
            <div><strong>Город:</strong> ${item.name}</div>
            <div><strong>Температура:</strong> ${Math.round(
                item.main.temp - 273
            )}&deg;C</div>
            <div><strong>Ощущается:</strong> ${Math.round(
                item.main.feels_like - 273
            )}&deg;C</div>
            <div><strong>Температура, минимальная:</strong> ${Math.round(
                item.main.temp_min - 273
            )}&deg;C</div>
            <div><strong>Температура, максимальная:</strong> ${Math.round(
                item.main.temp_max - 273
            )}&deg;C</div>
            <div><strong>Давление:</strong> ${Math.round(
                item.main.pressure * 0.75006375541921
            )}мм.тр.ст</div>
            <div><strong>Влажность:</strong> ${item.main.humidity}%</div>
            <div><strong>Скорость ветра:</strong> ${item.wind.speed}м/с</div>
            <div><strong>Облачность:</strong> ${
                item.weather[0].description
            }</div>
            <div><strong>Восход:</strong> ${replaceTime(item.sys.sunrise)}</div>
            <div><strong>Закат:</strong> ${replaceTime(item.sys.sunset)}</div>
            <div><strong>Текущее время:</strong> ${replaceTime(
                item.dt,
                true
            )}</div>
            <div><strong>Страна:</strong> ${country}</div>
            <div><strong>Столица:</strong> ${capital}</div>
            <div><strong>Краткое описание:</strong> ${description}</div>
        </div>       
    </div>
    `;

function getWeather() {
    const setCity = getElement(".set-city")
        .value.trim()
        .toLowerCase();
    getElement(".map").innerHTML = "";
    getElement(".weather-wrapper").innerHTML = "";
    const citiesUpd = cities.map(city => {
        city.name = city.name.toLowerCase();
        if (city.name === setCity) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${apiKey}`
            )
                .then(response => response.json())
                .then(data => {
                    getElement(
                        ".weather-wrapper"
                    ).innerHTML = generateTemplateWeather(
                        data,
                        city.capital,
                        city.description,
                        city.country
                    );
                    ymaps.ready(initYandexMap(data.coord.lat, data.coord.lon));
                });
        }
    });
}

/* Клик на кнопку */
getElement(".search-btn").onclick = getWeather;
/* ************ */

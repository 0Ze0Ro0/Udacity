// Personal API Key for OpenWeatherMap API
const apiKey = `1b2568f06d2c646416f8178d23bac13d`;

document.querySelector(`#generate`).addEventListener(`click`, () => {
  const zip = document.querySelector(`#zip`);
  getData(zip.value).then(() => getServerData());
  changImg();
  zip.value = "";
});

// Create a new date instance dynamically with JS
let d = new Date();
let weatherData = {
  date: d.toLocaleDateString(),
};
async function getData(zipCode) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    if (data.cod === 200) {
      if (data && data.match(/n+/g)) {
        const {
          main: { temp },
          name: city,
          weather: [{ description }],
        } = data;
        Object.defineProperties(weatherData, {
          temp: {
            writable: true,
            enumerable: true,
            configurable: true,
            value: temp.toFixed(1),
          },
          city: {
            writable: true,
            enumerable: true,
            configurable: true,
            value: city,
          },
          description: {
            writable: true,
            enumerable: true,
            configurable: true,
            value: description,
          },
        });
        postData(`http://localhost:5050/postData`, weatherData);
      }
    } else {
      let zipDiv = document.querySelector(`.zip`);
      zipDiv.classList.add(`shake`);
      let error = document.querySelector(`#error`);
      error.innerHTML = data.message;
      setTimeout(() => {
        zipDiv.classList.remove(`shake`);
        error.innerHTML = "";
      }, 2500);
      throw `${data.message}`;
    }
  } catch (error) {
    console.log(Error(error));
  }
}

async function postData(url = "", info = {}) {
  console.log(info);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log(Error(error));
  }
}

async function getServerData() {
  try {
    const res = await fetch(`http://localhost:5050/getData`);
    const data = await res.json();
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#date").innerHTML = data.date;
    document.querySelector("#temp").innerHTML = `${data.temp}&degC`;
    document.querySelector("#description").innerHTML = data.description;
    document.querySelector("#content").innerHTML =
      document.querySelector(`#feelings`).value;
  } catch (error) {
    console.log(Error(error));
  }
}

# Weather Journal App

### this app to get date, temperature, city, description for weather and how client feeling

##### First, I Created HTML & CSS files to to display the data

##### Second, I created a server to receive the data => server.js

For server i used : express, body-parser, cors and nodemon

##### Third, app.js :

###### App have 3 main function to get data

To get data from api => (https://openweathermap.org/):

```
getData()
```

To send the data received from the API to the server:

```
postData()
```

To get data from server to app:

```
getServerData
```

Added button click event to trigger those functions:
ex:

```
document.querySelector(`#generate`).addEventListener(`click`, () => {
  const zip = document.querySelector(`#zip`);
  getData(zip.value).then(() => getServerData());
  zip.value = "";
});
```

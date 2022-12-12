// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require(`express`);

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require(`body-parser`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require(`cors`);
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Get  Data => http://localhost:5050/getData
app.get(`/getData`, (req, res) => res.send(projectData).status(200));

// Post  Data => http://localhost:5050/postData
app.post(`/postData`, (req, res) => {
  projectData = req.body;
  res.send(projectData).status(200);
});

// Setup Server
const port = 5050;
app.listen(port, () =>
  console.log(`Server running on: http://localhost:${port}`)
);

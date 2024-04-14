/*
Resource: https://flaviocopes.com/how-to-serve-react-from-same-origin/
Data sources:
- State level data: https://covidtracking.com/data/api
- County level data: https://github.com/nytimes/covid-19-data
*/

const express = require("express");
const request = require("request");
const https = require("https");
const cors = require("cors");
const csv = require("csv-parser");
const fs = require("fs");
const app = express();
const port = 8080;
require("dotenv").config();

var API_KEY = process.env.API_KEY;

// Used to calculate cases/deaths increase
var countyHistory = {};

//CORS Middleware
app.use((req, res, next) => {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});
app.use(cors());

// Check to see that CSV date matches with current date... mb i should look at last update time tho
function updateCSV(_callback) {
  console.log("Update county CSVs");
  var csvDate = new Date();
  var currentDate = new Date();
  fs.createReadStream("us-counties-current.csv")
    .pipe(csv())
    .on("data", (row) => {
      csvDate = new Date(row.date);
      return;
    })
    .on("end", () => {
      csvDate.setDate(csvDate.getDate() + 1); // Day gets decremented by 1 for some reason e.g. 2020-03-16 will become 2020-03-15 idk why
      if (csvDate.toDateString() != currentDate.toDateString()) {
        console.log("CSVs updating...");
        updateCurrentCSV(function () {
          updateHistoryCSV(function () {
            _callback();
          });
        });
      } else {
        console.log("CSVs are up to date, just update current CSV");
        updateCurrentCSV(function () {
          _callback();
        });
      }
    });
}

function updateCurrentCSV(_callback) {
  const file = fs.createWriteStream("us-counties-current.csv");
  const request = https.get(
    "https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv",
    function (response) {
      var stream = response.pipe(file);
      stream.on("finish", function () {
        console.log("Finished writing to us-counties-current.csv");
        _callback();
      });
    }
  );
}

function updateHistoryCSV(_callback) {
  const file = fs.createWriteStream("us-counties-history.csv");
  const request = https.get(
    "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv",
    function (response) {
      var stream = response.pipe(file);
      stream.on("finish", function () {
        console.log("Finished writing to us-counties-history.csv");
        _callback();
      });
    }
  );
}

// Get the cases/deaths of all counties on the previous day
function getCountyPreviousDay(currentDate, _callback) {
  var dayBefore = new Date(currentDate);
  dayBefore.setDate(dayBefore.getDate() - 1);

  fs.createReadStream("us-counties-history.csv")
    .pipe(csv())
    .on("data", (row) => {
      var rowDate = new Date(row.date);
      rowDate.setDate(rowDate.getDate() + 1); // Day gets decremented by 1 for some reason e.g. 2020-03-16 will become 2020-03-15 idk why
      if (
        row.state === "Virginia" &&
        rowDate.toDateString() == dayBefore.toDateString()
      ) {
        // [cases, deaths]
        countyHistory[row.county.toLowerCase()] = [
          parseInt(row.cases),
          parseInt(row.deaths),
        ];
      }
    })
    .on("end", () => {
      // console.log(countyHistory);
      _callback();
    });
}

// ----- STATE DATA -----
// Get Virginia data for today
app.get("/state/today", (req, res) => {
  request(
    // "https://api.covidtracking.com/v1/states/va/current.json",
    "https://api.covidactnow.org/v2/state/VA.json?apiKey=" + API_KEY,
    { json: true },
    (err, res2, body) => {
      if (err) {
        return console.log(err);
      }
      res.json(body);
    }
  );
});

// Get all data for Virginia
app.get("/state/history", (req, res) => {
  request(
    "https://api.covidactnow.org/v2/state/VA.timeseries.json?apiKey=" + API_KEY,
    { json: true },
    (err, res2, body) => {
      if (err) {
        return console.log(err);
      }
      res.json(body);
    }
  );
});

// ----- COUNTY DATA -----
// Get all current data for one Virginia county
// app.get("/county/current/:county", (req, res) => {
//   updateCSV(function () {
//     const results = [];
//     fs.createReadStream("us-counties-current.csv")
//       .pipe(csv())
//       .on("data", (row) => {
//         if (
//           row.county.toLowerCase() === req.params.county.toLowerCase() &&
//           row.state === "Virginia"
//         ) {
//           row.cases = parseInt(row.cases); // Cases
//           row.deaths = parseInt(row.deaths); // Deaths
//           results.push(row);
//         }
//       })
//       .on("end", () => {
//         // console.log(results);
//         res.json(results);
//       });
//   });
// });

// Get all current data for all Virginia counties
app.get("/county/today", (req, res) => {
  request(
    "https://api.covidactnow.org/v2/county/VA.json?apiKey=" + API_KEY,
    { json: true },
    (err, res2, body) => {
      if (err) {
        return console.log(err);
      }
      res.json(body);
    }
  );
  // var currentDate = new Date();
  // updateCSV(function () {
  //   getCountyPreviousDay(currentDate, function () {
  //     const results = [];
  //     fs.createReadStream("us-counties-current.csv")
  //       .pipe(csv())
  //       .on("data", (row) => {
  //         if (row.state === "Virginia") {
  //           row.cases = parseInt(row.cases); // Cases
  //           row.deaths = parseInt(row.deaths); // Deaths

  //           var currentCounty = row.county.toLowerCase();
  //           var dayBefore = countyHistory[currentCounty];
  //           // Calculate cases/death increase
  //           if (dayBefore === undefined) {
  //             // console.log(currentCounty);
  //             row.casesIncrease = null;
  //             row.deathIncrease = null;
  //           } else {
  //             // console.log(currentCounty);
  //             row.casesIncrease = parseInt(row.cases) - dayBefore[0];
  //             row.deathIncrease = parseInt(row.deaths) - dayBefore[1];
  //           }
  //           results.push(row);
  //         }
  //       })
  //       .on("end", () => {
  //         // console.log(results);
  //         res.json(results);
  //       });
  //   });
  // });
});

// Get all historical data for one Virginia county
// app.get("/county/history/:county", (req, res) => {
//   updateCSV(function () {
//     const results = [];
//     fs.createReadStream("us-counties-history.csv")
//       .pipe(csv())
//       .on("data", (row) => {
//         if (
//           row.county.toLowerCase() === req.params.county.toLowerCase() &&
//           row.state === "Virginia"
//         ) {
//           row.cases = parseInt(row.cases); // Cases
//           row.deaths = parseInt(row.deaths); // Deaths
//           results.push(row);
//         }
//       })
//       .on("end", () => {
//         // console.log(results);
//         res.json(results);
//       });
//   });
// });

// Get all historical data for all Virginia counties
app.get("/county/history", (req, res) => {
  request(
    "https://api.covidactnow.org/v2/county/VA.timeseries.json?apiKey=" +
      API_KEY,
    { json: true },
    (err, res2, body) => {
      if (err) {
        return console.log(err);
      }
      res.json(body);
    }
  );
  // updateCSV(function () {
  //   const results = [];
  //   fs.createReadStream("us-counties-history.csv")
  //     .pipe(csv())
  //     .on("data", (row) => {
  //       if (row.state === "Virginia") {
  //         row.cases = parseInt(row.cases); // Cases
  //         row.deaths = parseInt(row.deaths); // Deaths
  //         results.push(row);
  //       }
  //     })
  //     .on("end", () => {
  //       // console.log(results);
  //       res.json(results);
  //     });
  // });
});

// Get list of available Virginia counties
app.get("/list-counties", (req, res) => {
  const results = new Set();
  fs.createReadStream("us-counties-current.csv")
    .pipe(csv())
    .on("data", (row) => {
      results.add(row.county);
    })
    .on("end", () => {
      // console.log(results);
      res.json(Array.from(results));
    });
});

// Run server
app.listen(port, () => {
  // updateCSV(function () {});
  console.log(`Example app listening at http://localhost:${port}`);
});

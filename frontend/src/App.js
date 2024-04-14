import "./App.css";
import axios from "axios";
import React from "react";
import CountyTable from "./components/CountyTable";
import CountySearch from "./components/CountySearch";
import StateStats from "./components/StateStats";
import PositiveCumulative from "./components/visualizations/PositiveCumulative";
import PositiveIncrease from "./components/visualizations/PositiveIncrease";
import HospitalizedCumulative from "./components/visualizations/HospitalizedCumulative";
import DeathRate from "./components/visualizations/DeathRate";
import HospitalBeds from "./components/visualizations/HospitalBeds";
import IcuBeds from "./components/visualizations/IcuBeds";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countyCurrentArray: [], activeIndex: 0 };
    this.handleStateCurrentData = this.handleStateCurrentData.bind(this);
    this.handleStateHistoryData = this.handleStateHistoryData.bind(this);
    this.handleCountyCurrentData = this.handleCountyCurrentData.bind(this);
    this.handleCountyHistoryData = this.handleCountyHistoryData.bind(this);
    this.getFormattedDate = this.getFormattedDate.bind(this);
    this.getDate = this.getDate.bind(this);
    this.getFormattedLastUpdated = this.getFormattedLastUpdated.bind(this);
  }

  // Onload function, make GET calls to get data
  componentDidMount() {
    // CURRENT STATE DATA
    const currentStateURL = "/state/today";
    axios.get(currentStateURL).then((response) => {
      // console.log(response);
      this.handleStateCurrentData(response);
    });

    // HISTORY STATE DATA
    const historyStateURL = "/state/history";
    axios.get(historyStateURL).then((response) => {
      // console.log(response);
      this.handleStateHistoryData(response);
    });

    // CURRENT COUNTY DATA
    const currentCountyURL = "/county/today";
    axios.get(currentCountyURL).then((response) => {
      // console.log(response);
      this.handleCountyCurrentData(response);
    });

    // HISTORY COUNTY DATA
    const historyCountyURL = "/county/history";
    axios.get(historyCountyURL).then((response) => {
      // console.log(response);
      this.handleCountyHistoryData(response);
    });
  }

  //  CURRENT STATE DATA
  handleStateCurrentData(response) {
    // console.log(response.data);
    this.setState({
      lastUpdatedDate: response.data.lastUpdatedDate,
      cases: response.data.actuals.cases,
      deaths: response.data.actuals.deaths,
      newCases: response.data.actuals.newCases,
      newDeaths: response.data.actuals.newDeaths,

      hospitalBedsCapacity: response.data.actuals.hospitalBeds.capacity,
      hospitalBedsCurrentUsageTotal:
        response.data.actuals.hospitalBeds.currentUsageTotal,
      hospitalBedsCurrentUsageCovid:
        response.data.actuals.hospitalBeds.currentUsageCovid,

      icuBedsCapacity: response.data.actuals.icuBeds.capacity,
      icuBedsCurrentUsageTotal: response.data.actuals.icuBeds.currentUsageTotal,
      icuBedsCurrentUsageCovid: response.data.actuals.icuBeds.currentUsageCovid,

      vaccinesDistributed: response.data.actuals.vaccinesDistributed,
      vaccinationsInitiated: response.data.actuals.vaccinationsInitiated,
      vaccinationsCompleted: response.data.actuals.vaccinationsCompleted,
      vaccinesAdministered: response.data.actuals.vaccinesAdministered,
    });
  }

  // HISTORY STATE DATA
  handleStateHistoryData(response) {
    var array = response.data.actualsTimeseries;
    // console.log(response);
    function stateHistoryMapper(x) {
      return {
        date: x.date,
        cases: x.cases,
        deaths: x.deaths,
        newCases: x.newCases,
        newDeaths: x.newDeaths,
        deathRate: (parseFloat(x.deaths) / parseFloat(x.cases)).toFixed(4),

        hospitalBedsCapacity: x.hospitalBeds.capacity,
        hospitalBedsCurrentUsageTotal: x.hospitalBeds.currentUsageTotal,
        hospitalBedsCurrentUsageCovid: x.hospitalBeds.currentUsageCovid,

        icuBedsCapacity: x.icuBeds.capacity,
        icuBedsCurrentUsageTotal: x.icuBeds.currentUsageTotal,
        icuBedsCurrentUsageCovid: x.icuBeds.currentUseageCovid,

        vaccinesDistributed: x.vaccinesDistributed,
        vaccinesInitiated: x.vaccinesInitiated,
        vaccinesCompleted: x.vaccinesCompleted,
        vaccinesAdministered: x.vaccinesAdministered,
      };
    }

    array = array.map(stateHistoryMapper);
    // console.log(array);
    this.setState({
      stateHistoryArray: array,
    });
  }

  //  CURRENT COUNTY DATA
  handleCountyCurrentData(response) {
    var array = response.data;
    function countyCurrentMapper(d) {
      return {
        county: d.county,
        lastUpdatedDate: d.lastUpdatedDate,
        population: d.population,
        testPositivityRatio: d.metrics.testPositivityRatio,
        caseDensity: parseFloat(d.metrics.caseDensity.toFixed(2)),
        infectionRate: parseFloat(
          parseFloat(d.metrics.infectionRate).toFixed(3)
        ),
        cases: d.actuals.cases,
        deaths: d.actuals.deaths,

        hospitalBedsCapacity: d.actuals.hospitalBeds.capacity,
        hospitalBedsCurrentUsageTotal: d.actuals.hospitalBeds.currentUsageTotal,
        hospitalBedsCurrentUsageCovid: d.actuals.hospitalBeds.currentUsageCovid,
        icuBedsCapacity: d.actuals.icuBeds.capacity,
        icuBedsCurrentUsageTotal: d.actuals.icuBeds.currentUsageTotal,
        icuBedsCurrentUsageCovid: d.actuals.icuBeds.currentUsageCovid,
        newCases: d.actuals.newCases,
        newDeaths: d.actuals.newDeaths,
        vaccinationsInitiated: d.actuals.vaccinationsInitiated,
        vaccinationsCompleted: d.actuals.vaccinationsCompleted,
        vaccinesAdministered: d.actuals.vaccinesAdministered,
      };
    }

    array = array.map(countyCurrentMapper);
    this.setState({
      countyCurrentArray: array,
    });
  }

  // HISTORY COUNTY DATA
  handleCountyHistoryData(response) {
    var array = response.data;

    function manyCountyHistoryMapper(res) {
      var arr = res.actualsTimeseries;
      function countyManyHistoryMapper(x) {
        return {
          date: x.date,
          cases: x.cases,
          deaths: x.deaths,
          newCases: x.newCases,
          newDeaths: x.newDeaths,
          deathRate: (parseFloat(x.deaths) / parseFloat(x.cases)).toFixed(4),

          hospitalBedsCapacity: x.hospitalBeds.capacity,
          hospitalBedsCurrentUsageTotal: x.hospitalBeds.currentUsageTotal,
          hospitalBedsCurrentUsageCovid: x.hospitalBeds.currentUsageCovid,

          icuBedsCapacity: x.icuBeds.capacity,
          icuBedsCurrentUsageTotal: x.icuBeds.currentUsageTotal,
          icuBedsCurrentUsageCovid: x.icuBeds.currentUseageCovid,

          newCases: x.newCases,
          newDeaths: x.newDeaths,
          vaccinesAdministeredDemographics: x.vaccinesAdministeredDemographics,
          vaccinationsInitiatedDemographics:
            x.vaccinationsInitiatedDemographics,
        };
      }
      return arr.map(countyManyHistoryMapper);
    }

    function getCounties(res) {
      return { county: res.county };
    }

    var counties = array.map(getCounties);
    var array = array.map(manyCountyHistoryMapper);
    var result = [];
    var result_counties = [];

    for (var i = 0; i < counties.length; i++) {
      result[counties[i]["county"]] = array[i];
      result_counties[i] = {
        label: counties[i]["county"],
        value: counties[i]["county"].toLowerCase(),
      };
    }

    this.setState({
      countyHistoryArray: result,
      listOfCounties: result_counties,
    });
  }

  // Date comes in as YYYYMMDD, this converts to a Date object
  getDate(dateString) {
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);
    return new Date(year, month - 1, day);
  }

  // Convert Date object to "MM/DD/YYYY" string
  getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : +month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : +day;
    return month + "/" + day + "/" + year;
  }

  // Convert Date object to "MM/DD/YYYY HH [AM/PM]" EST String
  // e.g. 4/2/2021 5 PM EST
  getFormattedLastUpdated(date) {
    var dateString =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    var hour = date.getHours();
    var PM_AM = "AM";
    if (hour > 12) {
      hour = hour - 12;
      PM_AM = "PM";
    }
    var timeString = hour + " " + PM_AM;
    return dateString + " at " + timeString + " EST";
  }

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="state-container">
          <StateStats {...this.state} />
          <br></br>
          <div className="state-visualization-container">
            <div className="visualization-item">
              <div className="graph-title">Total Cases and Deaths</div>
              <PositiveCumulative {...this.state} />
            </div>
            <div className="visualization-item">
              <div className="graph-title">Daily New Cases and Deaths</div>
              <PositiveIncrease {...this.state} />
            </div>
            <div className="visualization-item">
              <div className="graph-title">Death Rate</div>
              <DeathRate {...this.state} />
            </div>
            <div className="visualization-item">
              <div className="graph-title">Hospital Bed Capacity</div>
              <HospitalBeds {...this.state} />
            </div>
            <div className="visualization-item">
              <div className="graph-title">ICU Bed Capacity</div>
              <IcuBeds {...this.state} />
            </div>
          </div>
        </div>
        <div className="county-container nonOverlap">
          <div>
            <CountyTable {...this.state} />
          </div>
          <div className="nonOverlap">
            <CountySearch {...this.state} />
          </div>
        </div>
        <br></br>

        {/* TODO: ADD IN vaccination visualizations and stats */}
        {/* <div className="grid-container">
          <div className="grid-item">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={stateHistoryArray}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="positiveIncrease"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="deathIncrease"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid-item">
            <StateStats {...this.state} />
          </div>
          <div className="grid-item">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={stateHistoryArray}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="positive"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="death"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid-item">
            {" "}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  activeIndex={this.state.activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={this.onPieEnter}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid-item">
            <CountyTable />
          </div>
          <div className="grid-item">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                width={500}
                height={400}
                data={stateHistoryArray}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="deathRate" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="deathRate" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="grid-item">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={stateHistoryArray}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="hospitalizedCurrently"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="hospitalizedCumulative"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid-item">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={stateHistoryArray}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="hospitalizedIncrease"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="totalTestResultsIncrease"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid-item">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={stateHistoryArray}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="deathConfirmed" stackId="a" fill="#8884d8" />
                <Bar dataKey="deathProbable" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div> */}
      </div>
    );
  }
}

export default App;

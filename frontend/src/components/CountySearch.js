import React from "react";
import Select from "react-select";
import CountUp from "react-countup";
import "./CountySearch.css";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Label,
} from "recharts";

class CountySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: null };
  }

  handleChange = (selectedOption) => {
    this.setState({
      selectedOption: selectedOption,
    });
  };

  render() {
    const { selectedOption } = this.state;
    var result =
      selectedOption !== null
        ? [
            selectedOption.label,
            this.props.countyHistoryArray[selectedOption.label],
          ]
        : "False";

    // console.log(this.props.countyHistoryArray);
    let graph;
    let countyTable;
    if (this.props.countyHistoryArray !== undefined && result !== "False") {
      var countyArr = this.props.countyHistoryArray[result[0]];
      var today = countyArr[countyArr.length - 2];
      console.log(today);
      countyTable = (
        <div className="StateStatsContainer">
          <h1 className="title">{result[0]} COVID-19</h1>
          <br></br>
          <div className="stats-container">
            <div
              className="stats-item"
              style={{ borderRight: "1.5px solid #cfcfcf" }}
            >
              <div>
                Total Cases
                <div
                  style={{ color: "#fbc02d", fontSize: 24, fontWeight: "bold" }}
                >
                  <CountUp
                    separator=","
                    end={today.cases}
                    duration={2.75}
                  ></CountUp>
                </div>
              </div>
              <div>
                New Cases
                <div
                  style={{ color: "#fbc02d", fontSize: 24, fontWeight: "bold" }}
                >
                  +{" "}
                  <CountUp
                    separator=","
                    end={today.newCases}
                    duration={2.75}
                  ></CountUp>
                </div>
              </div>
            </div>
            <div className="stats-item">
              <div>
                Total Deaths
                <div
                  style={{ color: "#b71c1c", fontSize: 24, fontWeight: "bold" }}
                >
                  <CountUp
                    separator=","
                    end={today.deaths}
                    duration={2.75}
                  ></CountUp>
                </div>
              </div>
              <div>
                New Deaths
                <div
                  style={{ color: "#b71c1c", fontSize: 24, fontWeight: "bold" }}
                >
                  +{" "}
                  <CountUp
                    separator=","
                    end={today.newDeaths}
                    duration={2.75}
                  ></CountUp>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="stats-container">
            <div className="stats-item">
              <div>
                Hospital Bed Capacity: &nbsp; {hospitalBedsCapacity || "N/A"}{" "}
              </div>
              <div>
                Total beds filled: &nbsp;{" "}
                {hospitalBedsCurrentUsageTotal || "N/A"}
              </div>
              <div>
                Beds filled by COVID: &nbsp;{" "}
                {hospitalBedsCurrentUsageCovid || "N/A"}
              </div>
            </div>
            <div className="stats-item">
              <div>
                Vaccines Distributed &nbsp; {vaccinesDistributed || "N/A"}{" "}
              </div>
              <div>
                Vaccines Initiated: &nbsp; {vaccinationsInitiated || "N/A"}
              </div>
              <div>
                Vaccines Completed: &nbsp; {vaccinationsCompleted || "N/A"}
              </div>
            </div>
          </div> */}
        </div>
      );
      graph = (
        <div className="widthChanger">
          <h2 className="eachGraph">Total Cases and Deaths</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={this.props.countyHistoryArray[result[0]]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }}></YAxis>
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="cases"
                stroke="#F6BE00"
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="deaths"
                stroke="#ff6961"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <h2 className="eachGraph">Daily New Cases and Deaths</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={this.props.countyHistoryArray[result[0]]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }}></YAxis>
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="newCases"
                label="Total Positive"
                stroke="#F6BE00"
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="newDeaths"
                stroke="#ff6961"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <h2 className="eachGraph">Death Rate</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={this.props.countyHistoryArray[result[0]]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }}></YAxis>
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="deathRate"
                label="Death Rate"
                stroke="#F6BE00"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    } else {
      graph = <div>Please choose a county.</div>;
      countyTable = <div></div>;
    }
    return (
      <div className="widthChanger">
        <br />
        <h1>County History Data</h1>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={this.props.listOfCounties}
        />
        {countyTable}
        {graph}
      </div>
    );
  }
}

export default CountySearch;

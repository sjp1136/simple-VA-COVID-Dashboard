import React from "react";
import CountUp from "react-countup";
import "./StateStats.css";

class StateStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdatedDate: this.props.lastUpdatedDate,
      cases: this.props.cases,
      newCases: this.props.newCases,
      deaths: this.props.deaths,
      newDeaths: this.props.newDeaths,
      hospitalBedsCapacity: this.props.hospitalBedsCapacity,
      hospitalBedsCurrentUsageTotal: this.props.hospitalBedsCurrentUsageTotal,
      hospitalBedsCurrentUsageCovid: this.props.hospitalBedsCurrentUsageCovid,
      vaccinesDistributed: this.props.vaccinesDistributed,
      vaccinationsInitiated: this.props.vaccinationsInitiated,
      vaccinationsCompleted: this.props.vaccinationsCompleted,
      vaccinesAdministered: this.props.vaccinesAdministered,
    };
  }

  componentDidMount() {
    this.setState({
      lastUpdatedDate: this.props.lastUpdatedDate,
      cases: this.props.cases,
      newCases: this.props.newCases,
      deaths: this.props.deaths,
      newDeaths: this.props.newDeaths,
      hospitalBedsCapacity: this.props.hospitalBedsCapacity,
      hospitalBedsCurrentUsageTotal: this.props.hospitalBedsCurrentUsageTotal,
      hospitalBedsCurrentUsageCovid: this.props.hospitalBedsCurrentUsageCovid,
      vaccinesDistributed: this.props.vaccinesDistributed,
      vaccinationsInitiated: this.props.vaccinationsInitiated,
      vaccinationsCompleted: this.props.vaccinationsCompleted,
      vaccinesAdministered: this.props.vaccinesAdministered,
    });
  }
  render() {
    let lastUpdatedDate = this.props.lastUpdatedDate;
    let cases = this.props.cases;
    let newCases = this.props.newCases;
    let deaths = this.props.deaths;
    let newDeaths = this.props.newDeaths;

    let hospitalBedsCapacity = this.props.hospitalBedsCapacity;
    let hospitalBedsCurrentUsageTotal = this.props
      .hospitalBedsCurrentUsageTotal;
    let hospitalBedsCurrentUsageCovid = this.props
      .hospitalBedsCurrentUsageCovid;

    let vaccinesDistributed = this.props.vaccinesDistributed;
    let vaccinationsInitiated = this.props.vaccinationsInitiated;
    let vaccinationsCompleted = this.props.vaccinationsCompleted;
    let vaccinesAdministered = this.props.vaccinesAdministered;

    if (this.props.cases !== undefined) {
      cases = (
        <CountUp separator="," end={this.props.cases} duration={2.75}></CountUp>
      );

      newCases = (
        <CountUp
          separator=","
          end={this.props.newCases}
          duration={2.75}
        ></CountUp>
      );

      deaths = (
        <CountUp
          separator=","
          end={this.props.deaths}
          duration={2.75}
        ></CountUp>
      );
      newDeaths = (
        <CountUp
          separator=","
          end={this.props.newDeaths}
          duration={2.75}
        ></CountUp>
      );

      hospitalBedsCapacity = hospitalBedsCapacity.toLocaleString();
      hospitalBedsCurrentUsageTotal = hospitalBedsCurrentUsageTotal.toLocaleString();
      hospitalBedsCurrentUsageCovid = hospitalBedsCurrentUsageCovid.toLocaleString();

      vaccinesDistributed = vaccinesDistributed.toLocaleString();
      vaccinationsInitiated = vaccinationsInitiated.toLocaleString();
      vaccinationsCompleted = vaccinationsCompleted.toLocaleString();
      vaccinesAdministered = vaccinesAdministered.toLocaleString();
    }
    console.log(cases);

    return (
      <div className="StateStatsContainer">
        <div className="lastUpdated">
          Data updated: {lastUpdatedDate || "N/A"}{" "}
        </div>
        <h1 className="title">Virginia COVID-19</h1>
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
                {cases}
              </div>
            </div>
            <div>
              New Cases
              <div
                style={{ color: "#fbc02d", fontSize: 24, fontWeight: "bold" }}
              >
                +{newCases || "N/A"}
              </div>
            </div>
          </div>
          <div className="stats-item">
            <div>
              Total Deaths{" "}
              <div
                style={{ color: "#b71c1c", fontSize: 24, fontWeight: "bold" }}
              >
                {deaths || "N/A"}{" "}
              </div>
            </div>
            <div>
              New Deaths
              <div
                style={{ color: "#b71c1c", fontSize: 24, fontWeight: "bold" }}
              >
                +{newDeaths || "N/A"}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="stats-container">
          <div className="stats-item">
            <div>
              Hospital Bed Capacity: &nbsp; {hospitalBedsCapacity || "N/A"}{" "}
            </div>
            <div>
              Total beds filled: &nbsp; {hospitalBedsCurrentUsageTotal || "N/A"}
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
        </div>
      </div>
    );
  }
}

export default StateStats;

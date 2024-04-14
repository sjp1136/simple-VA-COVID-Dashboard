import React from "react";
import { GoMarkGithub } from "react-icons/go";
import { FaLinkedinIn } from "react-icons/fa";
import "./DataSources.css";
class DataSources extends React.Component {
  render() {
    return (
      <div className="center">
        <h1 className="text">Data Source</h1>

        <div className="flex center">
          <img className="picturesize" src="https://i.imgur.com/gjvLY77.png" />

          <div className="abouttext text">
            We would like to thank{" "}
            <a href="https://covidactnow.org/data-api">COVID ActNow</a> for
            providing their API to use their data for our project.
          </div>
        </div>
      </div>
    );
  }
}

export default DataSources;

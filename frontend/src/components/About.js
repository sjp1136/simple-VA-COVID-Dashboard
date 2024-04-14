import React from "react";
import { GoMarkGithub } from "react-icons/go";
import { FaLinkedinIn } from "react-icons/fa";
import "./About.css";
class About extends React.Component {
  render() {
    return (
      <div className="center">
        <h1 className="text">About Us</h1>
        <div className="flex center">
          <div className="flex2">
            <img src="https://i.imgur.com/6iwvfH3.png" className="picture" />
            <div className="names">Michael Chang</div>
            <div className="flex pad">
              <a href="https://github.com/Michael1009">
                <GoMarkGithub className="resize" />
              </a>

              <a href="https://www.linkedin.com/in/mchang2017/">
                <FaLinkedinIn className="resize" />
              </a>
            </div>
          </div>
          <div className="flex2">
            <img src="https://i.imgur.com/Wc3lfJS.png" className="picture" />
            <div className="names">Sung Joon Park</div>
            <div className="flex pad">
              <a href="https://github.com/sjp1136">
                <GoMarkGithub className="resize" />
              </a>

              <a href="https://www.linkedin.com/in/sjp/">
                <FaLinkedinIn className="resize" />
              </a>
            </div>
          </div>
        </div>
        <div className="abouttext text">
          Hello, this is Michael Chang and Sung Joon Park, 4th years at
          University of Virginia majoring in Computer Science in the School of
          Engineering. This project was initiated as part of our capstone
          research to better understand the COVID-19 pandemic data in our local
          state of Virginia. Since online dashabords have become the main means
          of the public to understand and be aware of the COVID-19 pandemic, it
          is important that they provide useful yet simple information that the
          public would like to see. One problem we see with existing dashboards
          is that they seek to display as much data as possible which may be too
          complex, being at much larger scale with national and international
          data. However, our goal with thic project is to develop a
          user-friendly COVID-19 dashboard for the state of Virginia that
          delivers on the state and county levels. It is to provide localized
          data that provides information that is both vital and actionable for
          the users in Virginia.{" "}
        </div>
      </div>
    );
  }
}

export default About;

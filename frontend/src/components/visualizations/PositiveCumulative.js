import React from "react";
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

class PositiveCumulative extends React.Component {
  render() {
    let stateHistoryArray = this.props.stateHistoryArray;
    // console.log(stateHistoryArray);
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={stateHistoryArray}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }}>
            {/* <Label
              value="Total Cases"
              angle={270}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            /> */}
          </YAxis>
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="cases"
            label="Total Positive"
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
    );
  }
}

export default PositiveCumulative;

import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  LineChart,
} from "recharts";

class DeathRate extends React.Component {
  render() {
    let stateHistoryArray = this.props.stateHistoryArray;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={stateHistoryArray}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }}></YAxis>
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
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
    );
  }
}

export default DeathRate;

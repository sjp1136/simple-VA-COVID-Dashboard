import React from "react";
import { Pie, PieChart, ResponsiveContainer, Sector, Cell } from "recharts";

class IcuBeds extends React.Component {
  render() {
    const data = [
      {
        name: "COVID",
        value: this.props.icuBedsCurrentUsageCovid,
      },
      {
        name: "Other",
        value:
          this.props.icuBedsCurrentUsageTotal -
          this.props.icuBedsCurrentUsageCovid,
      },
      {
        name: "Open",
        value: this.props.icuBedsCapacity - this.props.icuBedsCurrentUsageTotal,
      },
    ];

    // Filled from COVID (red), filled from other (orange), open beds (green)
    const COLORS = ["#FF8042", "#FFBB28", "#00C49F"];
    var total =
      this.props.icuBedsCapacity +
      this.props.icuBedsCurrentUsageTotal -
      this.props.icuBedsCurrentUsageCovid;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            fill="#8884d8"
            dataKey="value"
            label={(entry) =>
              entry.name +
              " (" +
              entry.value +
              ", " +
              ((entry.value * 100) / total).toFixed(2) +
              "%)"
            }
            style={{ fontSize: 12 }}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default IcuBeds;

import React from "react";
import Moment from "moment";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Paper, Typography } from "@mui/material";

const CustomToolTip = ({ active, payload, label }) => {
  var content = null;
  if (active && payload && payload.length) {
    content = (
      <React.Fragment>
        <Typography className="label" color="#000000">
          <strong>{`${formatDate(label)}`}</strong>
        </Typography>
        {formatPayloadData("Positivity", payload[0].value)}
        {formatPayloadData("7-Day Avg", payload[1].value)}
        {/*formatPayloadData("14-Day Avg", payload[2].value)*/}
      </React.Fragment>
    );
  }
  return <Paper sx={{ bgcolor: "white", p: 1, opacity: 0.9 }}>{content}</Paper>;
};

const formatPayloadData = (label, value) => {
  if (value === null) {
    return (
      <Typography color="#000000">
        {label}: <em>no data</em>
      </Typography>
    );
  }
  return (
    <Typography color="#000000">
      {label}: {formatPercent(value)}
    </Typography>
  );
};

const formatDate = (d) => {
  return Moment(d, "YYYY-MM-DD").format("MMM D, YY");
};

const formatPercent = (d) => {
  return d + "%";
};

export default function PositivityChart(props) {
  const data = props.data;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid stroke="#858585" />
        <XAxis
          dataKey="date"
          minTickGap={25}
          tickFormatter={formatDate}
          stroke="#EEEEEE"
        />
        <YAxis
          tickFormatter={formatPercent}
          width={50}
          domain={[
            0,
            (dataMax) => Math.min(Math.floor((dataMax + 3) / 4) * 4, 100)
          ]}
          stroke="#EEEEEE"
        />
        <Tooltip content={CustomToolTip} filterNull={false} />
        <Legend />
        <Bar name="Daily Positivity" dataKey="positivity" fill="#337AB7" />
        <Line
          name="7-Day Avg"
          dataKey="positivity_rolling_7"
          stroke="#D72638"
          dot={false}
          strokeWidth={2}
        />

        {/*<Line
          name="14-Day Avg"
          dataKey="positivity_rolling_14"
          stroke="#66DB57"
          dot={false}
          strokeWidth={2}
        />*/}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

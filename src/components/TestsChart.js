import React from "react";
import Moment from "moment";
import {
  BarChart,
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
        {formatPayloadData("Negative Tests", payload[0].value)}
        {formatPayloadData("Positive Tests", payload[1].value)}
        {formatPayloadData("Total Tests", payload[0].value + payload[1].value)}
      </React.Fragment>
    );
  }
  return <Paper sx={{ bgcolor: "white", p: 1, opacity: 0.9 }}>{content}</Paper>;
};

const formatDate = (d) => {
  return Moment(d, "YYYY-MM-DD").format("MMM D, YY");
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
      {label}: {value}
    </Typography>
  );
};

export default function TestsChart(props) {
  const data = props.data;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid stroke="#858585" />
        <XAxis
          dataKey="date"
          minTickGap={25}
          tickFormatter={formatDate}
          stroke="#EEEEEE"
        />
        <YAxis width={50} stroke="#EEEEEE" />
        <Tooltip content={CustomToolTip} filterNull={false} />
        <Legend />
        <Bar
          name="Negative Tests"
          dataKey="tests_negative"
          stackId="a"
          fill="#337AB7"
        />
        <Bar
          name="Positive Tests"
          dataKey="tests_positive"
          stackId="a"
          fill="#D72638 "
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

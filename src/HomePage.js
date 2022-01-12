import React, { useState } from "react";
import Moment from "moment";
import { Box, Grid, Card, Container, Typography } from "@mui/material/";
import TopAppBar from "./components/TopAppBar";
import DateRangeDialog from "./components/DateRangeDialog";
import PositivityChart from "./components/PositivityChart";
import TestsChart from "./components/TestsChart";
import ChartContainer from "./components/ChartContainer";
import Data from "./data.json";

export default function HomePage() {
  const data = Data;
  const [selectedData, setSelectedData] = useState(data);
  const [isDateRangeDialogOpen, setDateRangeDialog] = useState(false);

  const onDateRangeChange = (dates) => {
    const start = new Moment(dates[0]);
    const end = new Moment(dates[1]);
    if (start.isSameOrAfter(end)) {
      return;
    }
    var newSelectedData = [];
    for (var i = 0, size = data.length; i < size; i++) {
      var item = data[i];
      if (Moment(item.date).isAfter(end)) {
        break;
      }
      if (Moment(item.date).isSameOrAfter(start)) {
        newSelectedData.push(item);
      }
    }
    setSelectedData(newSelectedData);
  };

  const getPositivityRollingQuickFact = () => {
    const curr_pos_r_7 = data[data.length - 1].positivity_rolling_7;
    let indicator = "→";
    if (curr_pos_r_7 > data[data.length - 1 - 7].positivity_rolling_7)
      indicator = "↑";
    else if (curr_pos_r_7 < data[data.length - 1 - 7].positivity_rolling_7)
      indicator = "↓";
    return curr_pos_r_7.toFixed(2) + "%" + " " + indicator;
  };

  const getPositiveTestsQuickFact = () => {
    let curr_tests_pos_r_7 = 0;
    let prev_tests_pos_r_7 = 0;
    for (let i = 0; i < 7; i++) {
      curr_tests_pos_r_7 += data[data.length - 1 - i].tests_positive;
    }
    for (let i = 7; i < 14; i++) {
      prev_tests_pos_r_7 += data[data.length - 1 - i].tests_positive;
    }

    let indicator = "→";
    if (curr_tests_pos_r_7 > prev_tests_pos_r_7) indicator = "↑";
    else if (curr_tests_pos_r_7 < prev_tests_pos_r_7) indicator = "↓";
    return curr_tests_pos_r_7 + " " + indicator;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "auto",
        pb: 4,
        backgroundColor: (theme) => theme.palette.background.default
      }}
    >
      <TopAppBar openDateRangeDialog={setDateRangeDialog} />
      <DateRangeDialog
        setDateRange={onDateRangeChange}
        setDateRangeDialog={setDateRangeDialog}
        open={isDateRangeDialogOpen}
        minDate={Moment(data[0].date, "YYYY-MM-DD")}
        maxDate={Moment(data[data.length - 1].date, "YYYY-MM-DD")}
      />
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {/*spacing={{ xs: 2, md: 3}}*/}
          <Grid item xs={12} sm={4} md={6}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5">
                {getPositivityRollingQuickFact()}
              </Typography>
              <Typography>Positivity This Week</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5">
                {getPositiveTestsQuickFact()}
              </Typography>
              <Typography>Positive Tests This Week</Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <ChartContainer>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Daily Positivity
        </Typography>
        <PositivityChart data={selectedData} />
      </ChartContainer>
      <ChartContainer>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Daily Tests
        </Typography>
        <TestsChart data={selectedData} />
      </ChartContainer>
    </Box>
  );
}

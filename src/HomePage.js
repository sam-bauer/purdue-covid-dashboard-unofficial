import React, { useState } from "react";
import Moment from "moment";
import { Box, Container, Card, Typography } from "@mui/material/";
import TopAppBar from "./components/TopAppBar";
import DateRangeDialog from "./components/DateRangeDialog";
import PositivityChart from "./components/PositivityChart";
import TestsChart from "./components/TestsChart";
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
      <Container maxWidth="lg" sx={{ px: 2, pt: 2 }}>
        <Card sx={{ p: 3, pb: 6 }}>
          <Box
            sx={{
              height: "60vh"
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              Daily Positivity
            </Typography>
            <PositivityChart data={selectedData} />
          </Box>
        </Card>
      </Container>
      <Container maxWidth="lg" sx={{ px: 2, pt: 2 }}>
        <Card sx={{ p: 3, pb: 6 }}>
          <Box sx={{ height: "60vh" }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Daily Tests
            </Typography>
            <TestsChart data={selectedData} />
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

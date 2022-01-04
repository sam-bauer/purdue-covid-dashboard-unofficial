import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Fab
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DateRangeIcon from "@mui/icons-material/DateRange";

export default function TopAppBar(props) {
  const openDateRangeDialog = props.openDateRangeDialog;
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, top: 0, position: "sticky", zIndex: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton size="large" edge="start" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Purdue COVID-19 Data
            </Typography>
            <IconButton
              onClick={() => openDateRangeDialog(true)}
              size="large"
              edge="start"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <DateRangeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Fab
        onClick={() => openDateRangeDialog(true)}
        sx={{
          zIndex: 1,
          flexGrow: 1,
          position: "fixed",
          bottom: 16,
          right: 16,
          display: { xs: "block", md: "none" }
        }}
        color="primary"
      >
        <DateRangeIcon color="action" />
      </Fab>
    </React.Fragment>
  );
}

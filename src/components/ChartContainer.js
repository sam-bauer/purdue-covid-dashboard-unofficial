import React from "react";
import { Container, Card, Box, Typography } from "@mui/material";

export default function ChartContainer(props) {
  return (
    <Container maxWidth="lg" sx={{ px: 2, pt: 2 }}>
      <Card sx={{ p: 3, pb: 6 }}>
        <Box
          sx={{
            height: "60vh"
          }}
        >
          {props.children}
        </Box>
      </Card>
    </Container>
  );
}

import React from "react";
import { Grid, Box } from "@material-ui/core";
import Widget from "../Widget/Widget";
import { CircularProgress, Typography } from "../Wrappers/Wrappers";

export default function ProgressLoader(props) {
  const { title, message } = props;
  return (
    <>
      <Grid item xs={12}>
        <Widget title={title} disableWidgetMenu>
          <Box my={3} display="flex" flexWrap="wrap" justifyContent="center">
            <Box mt={1} mr={2}>
              <CircularProgress />
              <Typography
                variant={"h5"}
                weight={"bold"}
                style={{ marginBottom: 20 }}
              >
                {message}
              </Typography>
            </Box>
          </Box>
        </Widget>
      </Grid>
    </>
  );
}

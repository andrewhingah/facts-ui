import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Widget from "./Widget/Widget";
import axios from "axios";

export default function DataPage() {
  const customers = [];
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget disableWidgetMenu>
            <Button
              variant="contained"
              component={Link}
              to={"/app/create"}
              color="success"
            >
              Add Data
            </Button>
          </Widget>
        </Grid>

        <Grid item xs={12}>
          <MUIDataTable
            title="Data"
            data={customers}
            columns={["FIRST NAME", "LAST NAME", "AMOUNT", "DATE CREATED"]}
            options={{
              selectableRows: "none",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

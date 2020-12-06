import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Progress from "./Progress/Progress";
import Widget from "./Widget/Widget";
import axios from "axios";
import tableData from "../tableData"

export default function DataPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = useCallback(async () => {
    // const req = await axios.get(
    //   `http://${process.env.REACT_APP_HOST}:5000/api/customers`
    // );

    // const {
    //   data: { customers },
    // } = req;

    // let info = JSON.stringify(tableData)
    const tableInfo = tableData.map((customer) => {
      const item = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        amount: customer.amount,
        dateCreated: customer.createdAt,
      };
      return item;
    });
    const dataValues = tableInfo.map((obj) => {
      const objValues = Object.values(obj);
      return objValues;
    });
    setCustomers(dataValues);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetchCustomers();
    }
  }, [fetchCustomers, isLoading, customers]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

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

        {isLoading ? (
          <Progress />
        ) : (
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
        )}
      </Grid>
    </>
  );
}

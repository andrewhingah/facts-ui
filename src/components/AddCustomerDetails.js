import axios from "axios";
import React, { Component } from "react";
import { Box, Grid, TextField as Input } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import Widget from "./Widget/Widget";
import { Typography } from "./Wrappers/Wrappers";
import Progress from "./Progress/Progress";
import tableData from "../tableData";
import useStyles from "./styles";

export const DetailsForm = (props) => {
  var classes = useStyles();
  const { state, handleChange, hasBlankFields } = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Widget>
          <Grid item justify={"center"} container>
            <Box display={"flex"} flexDirection={"column"} width={600}>
              <Typography
                variant={"h5"}
                weight={"bold"}
                style={{ marginBottom: 30 }}
              >
                Add Details
              </Typography>
              <Input
                required={true}
                label={
                  state.errors.firstName &&
                  state.errors.firstName.length > 0 ? (
                    state.errors.firstName
                  ) : (
                    <Typography variant="headline" component="h7">
                      {" "}
                      First Name{" "}
                    </Typography>
                  )
                }
                margin="normal"
                variant="outlined"
                fullWidth={true}
                onBlur={handleChange("firstName")}
                error={
                  state.errors.firstName && state.errors.firstName.length > 0
                }
                defaultValue={state.value.firstName}
              />
              <Input
                required={true}
                label={
                  state.errors.lastName && state.errors.lastName.length > 0 ? (
                    state.errors.lastName
                  ) : (
                    <Typography variant="headline" component="h7">
                      {" "}
                      Last Name{" "}
                    </Typography>
                  )
                }
                margin="normal"
                variant="outlined"
                fullWidth={true}
                onBlur={handleChange("lastName")}
                defaultValue={state.value.lastName}
                error={
                  state.errors.lastName && state.errors.lastName.length > 0
                }
              />

              <Input
                type="number"
                required={true}
                label={
                  state.errors.amount && state.errors.amount.length > 0 ? (
                    state.errors.amount
                  ) : (
                    <Typography variant="headline" component="h7">
                      {" "}
                      Amount{" "}
                    </Typography>
                  )
                }
                margin="normal"
                variant="outlined"
                fullWidth={true}
                onChange={handleChange("amount")}
                defaultValue={state.value.amount}
                error={state.errors.amount && state.errors.amount.length > 0}
              />

              <Grid className={classes.formButtons}>
                <Button
                  onClick={props.back}
                  variant={"outlined"}
                  color={"primary"}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={hasBlankFields}
                  onClick={props.save}
                >
                  Save
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Widget>
      </Grid>
    </Grid>
  );
};

class AddCustomerDetails extends Component {
  state = {
    isAddCustomerLoading: false,
    redirect: false,
    step: 1,
    value: {},
    errors: {},
  };

  toastStyles = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  formData = (formName, error, value) => {
    this.setState({
      ...this.state,
      value: {
        ...this.state.value,
        [formName]: value,
      },
      errors: {
        ...this.state.errors,
        [formName]: error,
      },
    });
  };

  validate = (input) => (e) => {
    const requiredFields = ["firstName", "lastName", "dateOfBirth"];
    const { target } = e;
    if (target.value.trim().length === 0 && requiredFields.includes(input)) {
      this.formData(input, `${input} is required`, target.value);
    } else {
      this.formData(input, "", target.value.toUpperCase());
    }
  };

  back = async () => {
    this.setState({
      ...this.state,
      redirect: true,
    });
  };

  save = async () => {
    const { firstName, lastName, amount, createdAt } = this.state.value;
    this.setState({
      ...this.state,
      isAddCustomerLoading: true,
    });
    // await axios
    //   .post(`http://${process.env.REACT_APP_HOST}:5000/api/customers`, data)
    //   .then((res) => {
    //     toast.success(res.data.message, this.toastStyles);
    //     this.setState({
    //       ...this.state,
    //       redirect: true,
    //     });
    //   });
    tableData.push({ id: uuidv4(), firstName, lastName, amount, createdAt });
    this.setState({
            ...this.state,
            redirect: true,
          });
  };

  render() {
    const { isAddCustomerLoading } = this.props;
    if (this.state.redirect) {
      return <Redirect to="/app/data-listing" />;
    }
    if (isAddCustomerLoading) {
      return <Progress message="Processing details ..." />;
    }

    const checkIfFormValid = () => {
      let isFormValid = false;
      const { value, errors } = this.state;
      const isNotEmpty = (element) => element.trim().length !== 0;
      const hasErrors = Object.values(errors).some(isNotEmpty);
      isFormValid =
        value.firstName && value.lastName && value.amount && !hasErrors;
      return isFormValid;
    };

    return (
      <React.Fragment>
        <DetailsForm
          state={this.state}
          back={this.back}
          save={this.save}
          handleChange={this.validate}
          hasBlankFields={!checkIfFormValid()}
        />
      </React.Fragment>
    );
  }
}

export default AddCustomerDetails;

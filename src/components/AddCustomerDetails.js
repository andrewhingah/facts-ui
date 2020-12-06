import axios from "axios";
import React, { Component } from "react";
import { Box, Grid, TextField as Input } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Widget from "./Widget/Widget";
import { Typography } from "./Wrappers/Wrappers";
import Progress from "./Progress/Progress";
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
                onBlur={handleChange("amount")}
                defaultValue={state.value.amount}
                error={state.errors.amount && state.errors.amount.length > 0}
              />

              <Grid className={classes.formButtonsStart}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={hasBlankFields}
                  onClick={props.continue}
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
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAddCustomerSuccess !== this.props.isAddCustomerSuccess) {
      if (this.props.isAddCustomerSuccess) {
        this.setState({
          ...this.state,
          redirect: true,
        });
      }
    }
  }

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

  save = async () => {
    const data = this.state;
    this.setState({
      ...this.state,
      isAddCustomerLoading: true,
    });
    await axios
      .post(`http://${process.env.REACT_APP_HOST}:8000/api/v1/customers`, {
        data,
      })
      .then(() => {
        this.setState({
          ...this.state,
          redirect: true,
        });
      });
  };

  render() {
    const { isAddCustomerLoading } = this.props;
    if (this.state.redirect) {
      return <Redirect to="/app/customers" />;
    }
    if (isAddCustomerLoading) {
      return <Progress message="Processing details ..." />;
    }

    const checkIfFormValid = () => {
      const { errors } = this.state;
      const isNotEmpty = (element) => element.trim().length !== 0;
      const isFormValid = Object.values(errors).some(isNotEmpty);
      return isFormValid;
    };

    return (
      <React.Fragment>
        <DetailsForm
          state={this.state}
          save={this.save}
          handleChange={this.validate}
          handleDateChange={this.handleDateChange}
          hasBlankFields={!checkIfFormValid}
        />
      </React.Fragment>
    );
  }
}

export default AddCustomerDetails;

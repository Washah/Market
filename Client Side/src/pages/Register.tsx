import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";
import { RegisterFormValues } from "../types/RegisterFormValues";
import {
  stepOneResolver,
  stepTwoResolver,
} from "../validators/registerValidator";
import { toast } from "react-toastify";
import { useRegister } from "../hooks/useRegister";
import { useCities } from "../hooks/useCities";
import useResponsive from "../hooks/useResponsive";

const Register = () => {
  // Define the steps for registration
  const steps = ["User settings", "User information"];

  // Current active step in the registration process
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // Set up form handling using react-hook-form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: activeStep === 0 ? stepOneResolver : stepTwoResolver,
  });

  // Hook to handle registration steps
  const { firstStepSubmit, secondStepSubmit, finalSubmit } = useRegister();
  // Hook to to get all cities from api
  const cities = useCities();

  // Handler for the first step form submission
  const firstStepHandle = handleSubmit(async data => {
    try {
      if (await firstStepSubmit(data)) handleNext();
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.error(err);
    }
  });

  // Handler for the second step form submission
  const secondStepHandle = handleSubmit(data => {
    if (secondStepSubmit(data)) handleNext();
  });

  // Handler for the final form submission
  const finalSubmitHandle = async () => {
    try {
      await finalSubmit();
    } catch (err: any) {
      console.error(err);
    }
  };

  const { isTabletOrMobile } = useResponsive();

  return (
    <Box
      sx={{
        width: isTabletOrMobile ? "80%" : "40%",
        margin: "2rem auto",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        className="blueText center"
        sx={{
          fontFamily: "Josefin Sans",
          fontWeight: 400,
        }}
      >
        Register
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map(label => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={finalSubmitHandle}>Create Account</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {/* step 1 inputs */}
          {activeStep === 0 && (
            <div className="firstStepInputs">
              <form onSubmit={firstStepHandle}>
                <FormInput
                  register={register("idNumber")}
                  name="idNumber"
                  label="Id Number"
                  type="number"
                  error={!!errors.idNumber}
                  helperText={errors.idNumber?.message}
                />
                <FormInput
                  register={register("email")}
                  name="email"
                  label="Email"
                  type="text"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <FormInput
                  register={register("password")}
                  name="password"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <FormInput
                  register={register("confirmPassword")}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit">Next</Button>
                </Box>
              </form>
            </div>
          )}
          {/* step 2 inputs */}
          {activeStep === 1 && (
            <div className="secondStepInputs">
              <form onSubmit={secondStepHandle}>
                <FormInput
                  name="city"
                  label="City"
                  type="select"
                  control={control}
                  selectOptions={cities}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
                <FormInput
                  register={register("street")}
                  name="street"
                  label="Street"
                  type="text"
                  error={!!errors.street}
                  helperText={errors.street?.message}
                />
                <FormInput
                  register={register("firstName")}
                  name="firstName"
                  label="First Name"
                  type="string"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
                <FormInput
                  register={register("lastName")}
                  name="lastName"
                  label="Last Name"
                  type="string"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button color="inherit" onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="submit">Finish</Button>
                </Box>
              </form>
            </div>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};

export default Register;

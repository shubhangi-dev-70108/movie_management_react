import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Paper,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import SuccessPopup from "../componenets/SuccessPopup";
import axios from "axios";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Username: "",
      Password: "",
      Gender: "",
      role: "",
    },
    mode: "onChange",
  });

  const [open, setOpen] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:3000/users", data);

      if (response.status === 201) {
        setOpen(true);
      }
    } catch (error) {
      alert("SignUp failed");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    navigate("/signin");
  };

  const navigate = useNavigate();
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        maxWidth: 370,
        mx: "auto",
        mt: 10,
        background: "linear-gradient(135deg, #acb2bb, #ffffff)",
        borderRadius: 3,
        boxShadow: 5,
      }}
    >
      <Typography variant="h5" mb={2}>
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="Username"
            control={control}
            rules={{
              required: "username is required",
              minLength: {
                value: 4,
                message: "Minimum 3 characters required",
              },
            }}
            render={({ field }) => (
              <Stack spacing={2}>
                <TextField
                  {...field}
                  label="Username"
                  fullWidth
                  error={!!errors.Username}
                  helperText={errors.Username?.message}
                />
              </Stack>
            )}
          />

          <Controller
            name="Password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <Stack spacing={2}>
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  fullWidth
                  error={!!errors.Password}
                  helperText={errors.Password?.message}
                />
              </Stack>
            )}
          />

          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="role-label">Select Role</InputLabel>
                <Select {...field} label="role" labelId="role-label">
                  <MenuItem value="">
                    <em>Select Role</em>
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
                <FormHelperText>{errors.role?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="Gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <FormControl error={!!errors.Gender}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
                <FormHelperText>{errors.Gender?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <>
            <Button variant="contained" type="submit">
              Submit
            </Button>

            {/* Popup */}
            <SuccessPopup
              open={open}
              handleOk={handleOk}
              handleClose={handleClose}
              title={"Your form has been submitted!"}
            />
          </>

          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#ec6d73",
              color: "#fff",
              "&:hover": { backgroundColor: "#f42f39" },
            }}
            fullWidth
            onClick={() => {
              navigate("/signin");
            }}
          >
            Back to Sign In
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default SignUp;

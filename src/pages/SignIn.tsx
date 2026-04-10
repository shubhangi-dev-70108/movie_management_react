import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const SignIn = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const { loginFn, dispatch } = useAuth();

  //using useMemo hook
  const isvalidate = useMemo(
    () => loginId?.length >= 3 && password?.length >= 6,
    [loginId, password],
  );

  /* using usecallback hook */
  const handleSubmit = useCallback(async () => {
    /* on successfully validation */

    if (isvalidate) {
      /* API check for username */
      try {
        const response = await axios.get(
          `http://localhost:3000/users?Username=${loginId}`,
        );

        if (response.status === 200) {
          loginFn?.();
          //setting the role in local storage after sign in
          localStorage.setItem("role", response.data[0].role);

          if (response.data[0].role == "admin") {
            // if role is admin then reducer store the role
            dispatch?.({
              type: "LOGIN",
              payload: {
                role: "admin",
              },
            });
            navigate("/movies");
          } else {
            dispatch?.({
              type: "LOGIN",
              payload: {
                role: "user",
              },
            });
            navigate("/movies");
          }
        }
      } catch (error) {
        alert("Error");
      }
    } else {
      alert("Login Error");
    }
  }, [loginId, isvalidate]); // dependency of state variable because using callback function

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 320,
          width: "100%",
          background: "linear-gradient(135deg, #acb2bb, #ffffff)",
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <Typography variant="h6" mb={1}>
          Sign In
        </Typography>

        <form onSubmit={() => {}}>
          <Stack spacing={1.5}>
            {/* username */}
            <TextField
              label="Username"
              name="Username"
              size="small"
              fullWidth
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              error={loginId?.length > 0 && loginId.length < 3}
              helperText={
                loginId?.length > 0 && loginId.length < 3
                  ? "Minimum 3 characters required"
                  : ""
              }
            />

            {/* password */}
            <TextField
              label="Password"
              name="password"
              type="password"
              size="small"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={password?.length > 0 && password.length < 6}
              helperText={
                password?.length > 0 && password.length < 6
                  ? "Minimum 6 characters required"
                  : ""
              }
            />

            {/* signin button */}
            <Button
              variant="contained"
              size="small"
              fullWidth
              onClick={handleSubmit}
              disabled={!isvalidate}
            >
              Sign in
            </Button>

            {/* go to signup  */}
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "#ec6d73",
                color: "#fff",
                "&:hover": { backgroundColor: "#f42f39" },
              }}
              fullWidth
              onClick={() => {
                navigate("/signup");
              }}
            >
              Not a user? Sign Up
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default SignIn;

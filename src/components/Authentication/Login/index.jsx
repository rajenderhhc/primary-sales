/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  LoaderOpen,
  LoaderClose,
} from "../../../Utils/Swalhandler/LoaderHandler";

const defaultTheme = createTheme();

export default function SignIn() {
  document.title = "PrimarySales | Loin Page";
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    const jwtToken = Cookies.get(`${process.env.REACT_APP_TOKEN}`);
    if (jwtToken) navigate("/");
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";
    const storedUsername = localStorage.getItem("username") || "";
    const storedPassword = localStorage.getItem("password") || "";

    setUsername(storedRememberMe ? storedUsername : "");
    const bytes = CryptoJS.AES.decrypt(storedPassword, "encryptionKey");
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    setPassword(storedRememberMe ? decryptedPassword : "");
    setRememberMe(storedRememberMe);
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const baseUrl = `${process.env.REACT_APP_API}/emp`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      LoaderOpen();
      // const userDetails = {
      //   empId: username,
      //   password: password,
      // };

      // const url = `${baseUrl}/login`;

      // const response = await axios.post(url, userDetails);

      const url = `https://apisfadoctors.heterohealthcare.com/api/AECardsLogin/Login?empCode=${username}&password=${password}`;

      const response = await axios.get(url);

      console.log(response);

      if (response.status === 200) {
        const {
          token,
          employeeBasicDetails,
          empTSEDetails,
          employeeDivisionDetails,
          employeeHierarchyDetails,
        } = response.data;
        Cookies.set(`${process.env.REACT_APP_TOKEN}`, token);
        localStorage.setItem(
          `${process.env.REACT_APP_USER_KEY}`,
          JSON.stringify(employeeBasicDetails[0])
        );
        // const { jwtToken, employeeDetails } = response.data;
        // Cookies.set(`${process.env.REACT_APP_TOKEN}`, jwtToken);
        // localStorage.setItem(
        //   `${process.env.REACT_APP_USER_KEY}`,
        //   JSON.stringify(employeeDetails)
        // );
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("username", username);
          const encryptedPassword = CryptoJS.AES.encrypt(
            password,
            "encryptionKey"
          ).toString();
          localStorage.setItem("password", encryptedPassword);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
        LoaderClose();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success!",
          text: "Redirecting to Dashboard...",
          customClass: {
            title: "my-custom-title-class", // Add a custom class for the title
          },
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        LoaderClose();
        Swal.fire({
          icon: "error",
          title: "oops",
          text: "Something went wrong!",
        });
      }
    } catch (err) {
      LoaderClose();
      setErrorMessage(
        err.response ? `${err.response.data.message} ` : "Something went wrong!"
      );
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box className="mt-5">
                  <img
                    alt="logo"
                    src="../../../logo.svg"
                    style={{ width: 180, margin: "3px" }}
                  />
                </Box>
                <Box component="form" onSubmit={handleSubmit}>
                  <FormControl
                    fullWidth
                    required
                    sx={{ my: 2 }}
                    variant="outlined"
                    autoComplete="email"
                  >
                    <InputLabel htmlFor="outlined-adornment-username">
                      UserName
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-username"
                      label="Username"
                      required
                      value={username}
                      onChange={handleUsernameChange}
                      autoComplete="email"
                      inputProps={{
                        minLength: 3, // Minimum length allowed
                        maxLength: 20, // Maximum length allowed
                      }}
                      autoFocus
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ my: 2 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      value={password}
                      required
                      onChange={handlePasswordChange}
                      inputProps={{
                        minLength: 5, // Minimum length allowed
                        maxLength: 16, // Maximum length allowed
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControlLabel
                    sx={{ mb: 2 }}
                    control={
                      <Checkbox
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                      />
                    }
                    label="Remember Me"
                  />
                  {errorMessage !== "" ? (
                    <p className="text-danger my-2">* {errorMessage}</p>
                  ) : null}
                  <Button type="submit" fullWidth variant="contained">
                    Sign In
                  </Button>
                </Box>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 8, mb: 4 }}
              >
                {"Copyright © "}
                <a target="__blanck" href="https://www.heterohealthcare.com/">
                  Hetero Health Care
                </a>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </Container>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </ThemeProvider>
  );
}

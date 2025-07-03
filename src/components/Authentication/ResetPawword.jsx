import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../Header';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import FacebookCircularProgress from '../ProgressLoader';

const ResetPawword = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    curretntPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const onChangeValue = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const baseUrl = `${process.env.REACT_APP_API}/emp`;

  const onChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (inputs.newPassword !== inputs.confirmPassword) {
        setShowError(true);
        setErrorMsg('Passwords do not match');
      } else {
        const url = `${baseUrl}/reset/password`;
        const jwttoken = Cookies.get(`${process.env.REACT_APP_TOKEN}`);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwttoken}`,
        };
        setLoading(true);
        const response = await axios.post(url, inputs, { headers });
        const { jwtToken } = response.data;
        Cookies.set(`${process.env.REACT_APP_TOKEN}`, jwtToken, {
          expires: 1,
        });
        setShowError(false);
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password changed successfully',
          showConfirmButton: false,
          timer: 2500,
        });
        setTimeout(() => {
          navigate('/');
        }, 2500);
      }
    } catch (err) {
      setLoading(false);
      setShowError(true);
      const errorMessage = err.response
        ? err.response.data.message
          ? err.response.data.message
          : err.response.statusText
        : 'opps something went wrong';
      setErrorMsg(errorMessage);
    }
  };

  return (
    <div>
      <Header />

      <div className='h-100 d-flex justify-content-center align-items-center'>
        <div className={`${isMobile ? 'w-75' : 'w-25'} mt-5`}>
          {loading && <FacebookCircularProgress />}
          <Box component='form' onSubmit={onChangePassword}>
            <FormControl
              fullWidth
              required
              sx={{ my: 2 }}
              variant='outlined'
              autoComplete='email'>
              <InputLabel htmlFor='curretntPassword'>
                CurretntPassword
              </InputLabel>
              <OutlinedInput
                id='curretntPassword'
                label='CurretntPassword'
                required
                value={inputs.curretntPassword}
                onChange={onChangeValue}
                autoComplete='email'
                inputProps={{
                  minLength: 5, // Minimum length allowed
                  maxLength: 16, // Maximum length allowed
                }}
                autoFocus
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }} variant='outlined'>
              <InputLabel htmlFor='newPassword'>NewPassword</InputLabel>
              <OutlinedInput
                id='newPassword'
                type={showPassword ? 'text' : 'password'}
                label='Password'
                value={inputs.newPassword}
                required
                onChange={onChangeValue}
                inputProps={{
                  minLength: 8, // Minimum length allowed
                  maxLength: 16, // Maximum length allowed
                }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                ConfirmPassword
              </InputLabel>
              <OutlinedInput
                id='confirmPassword'
                type='password'
                label='ConfirmPassword'
                value={inputs.confirmPassword}
                required
                onChange={onChangeValue}
                inputProps={{
                  minLength: 8, // Minimum length allowed
                  maxLength: 16, // Maximum length allowed
                }}
              />
            </FormControl>

            <Button type='submit' fullWidth variant='contained'>
              Submit
            </Button>
            <p className='mt-3 text-danger fs-5'>
              {showError ? `* ${errorMsg}` : ''}
            </p>

            <Typography
              variant='body2'
              color='text.secondary'
              align='center'
              sx={{ mt: 8, mb: 4 }}>
              {'Copyright © '}
              <a
                color='inherit'
                target='__blanck'
                href='https://www.heterohealthcare.com/'>
                Hetero Health Care
              </a>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ResetPawword;

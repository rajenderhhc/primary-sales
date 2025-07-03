import { Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <div className='m-2'>
      {' '}
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
        sx={{ m: 2 }}>
        {'Copyright © '}
        <a
          color='inherit'
          target='__blank'
          href='https://www.heterohealthcare.com/'>
          Hetero Health Care
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
};

export default Footer;

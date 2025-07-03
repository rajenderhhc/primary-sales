import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

// Inspired by the former Facebook spinners.
const FacebookCircularProgress = (props) => {
  return (
    <Box sx={{ position: 'absolute', top: '40%', left: '50%', zIndex: 1 }}>
      <CircularProgress
        variant='determinate'
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant='indeterminate'
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
};

export default FacebookCircularProgress;

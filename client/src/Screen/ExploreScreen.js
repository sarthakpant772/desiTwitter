import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import TweetSummary from '../components/TweetSummary'

const ExploreScreen = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '95%', marginTop: '1em' }}>
        <TextField
          label="Explore"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'secondary.contrastText' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '100%',
            borderRadius: '10px',
            backgroundColor: 'primary.light',
            '& input': {
              color: 'white', // Set the input text color to white
            },
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: '1em',
          width: '95%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          color: 'primary.contrastText',
        }}
      >
        <Button
          sx={{
            height: '2em',
            '&:hover': {
              verticalAlign: 'middle',
              borderTop: '3px solid',
              borderBottom: '3px solid red', // Add this to change the bottom border when hovering
            },
          }}
        >
          <Typography variant="subtitle2" color="primary.contrastText">
            For you
          </Typography>
        </Button>
        <Button
          sx={{
            height: '2em',
            '&:hover': {
              borderTop: '3px solid',
              borderBottom: '3px solid red', // Add this to change the bottom border when hovering
            },
          }}
        >
          <Typography variant="subtitle2" color="primary.contrastText">
            Trending
          </Typography>
        </Button>
        <Button
          sx={{
            height: '2em',
            '&:hover': {
              borderTop: '3px solid',
              borderBottom: '3px solid red', // Add this to change the bottom border when hovering
            },
          }}
        >
          <Typography variant="subtitle2" color="primary.contrastText">
            News
          </Typography>
        </Button>
        <Button
          sx={{
            height: '2em',
            '&:hover': {
              borderTop: '3px solid',
              borderBottom: '3px solid red', // Add this to change the bottom border when hovering
            },
          }}
        >
          <Typography variant="subtitle2" color="primary.contrastText">
            Technology
          </Typography>
        </Button>
      </Box>
      <Box sx={{ width: '95%', marginTop: '1em' }}>
        <TweetSummary />
        <TweetSummary />
        <TweetSummary />
      </Box>
    </Box>
  )
}

export default ExploreScreen

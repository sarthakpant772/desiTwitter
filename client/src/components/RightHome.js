import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import TrendingNav from './TrendingNav'
import SearchIcon from '@mui/icons-material/Search'

const RightHome = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '4em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2em',
        }}
      >
        <TextField
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
      <Paper
        sx={{
          marginTop: '2em',
          width: '100%',
          minHeight: '40%',
          backgroundColor: 'primary.light',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" color="primary.contrastText">
          Trending
        </Typography>
        <Box sx={{ width: '100%', height: '90%' }}>
          <TrendingNav
            trend="tech"
            hashTag="#thisisfucked"
            numberOfPost="12k"
          />
          <TrendingNav
            trend="tech"
            hashTag="#thisisfucked"
            numberOfPost="12k"
          />
          <TrendingNav
            trend="tech"
            hashTag="#thisisfucked"
            numberOfPost="12k"
          />
        </Box>
        {/* <TrendingNav trend="tech" hashTag="#thisisfucked" numberOfPost="12k" /> */}
        <Button>
          <Typography sx={{ color: 'secondary.contrastText' }}>More</Typography>
        </Button>
      </Paper>
    </Box>
  )
}

export default RightHome

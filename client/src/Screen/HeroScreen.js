import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import CenterConponent from '../components/CenterConponent'
import LeftNav from '../components/LeftNav'
import RightHome from '../components/RightHome'
import ShowPost from '../components/ShowPost'
import ExploreScreen from './ExploreScreen'
import ProfileScreen from './ProfileScreen'
import TweetsScreen from './TweetsScreen'
import DehazeIcon from '@mui/icons-material/Dehaze'
const HeroScreen = () => {
  const [nav, setNav] = useState(false)
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'primary.main',
      }}
    >
      {/* left */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '20%',
          height: '100%',
        }}
      >
        <LeftNav />
      </Box>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          position: 'absolute',
          marginTop: '2em',
          left: '0.1em',
          // height: '100%',
          zIndex: 2,
          marginLeft: '0.5em',
        }}
      >
        {nav ? (
          <Box
            sx={{
              width: '20em',
              position: 'relative',
              backgroundColor: 'primary.dark',
            }}
          >
            <Button onClick={() => setNav(!nav)}>
              <DehazeIcon sx={{ color: 'primary.contrastText' }} />
            </Button>
            <LeftNav />
          </Box>
        ) : (
          <Button onClick={() => setNav(!nav)}>
            <DehazeIcon sx={{ color: 'primary.contrastText' }} />
          </Button>
        )}
      </Box>
      {/* middle */}
      <Box
        sx={{
          width: { xs: '90%', md: '50%' },
          marginTop: '1em',
          marginTop: { xs: '4em', md: 0 },
          marginLeft: { xs: '1em', md: 0 },
          overflowY: 'scroll',
          // Hide the scrollbar
          '&::-webkit-scrollbar': {
            width: '0.4em', // Adjust as needed
            display: 'none', // Hide the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Outlet />
      </Box>

      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          width: { md: '20%' },
          marginTop: { xs: '3.7em', md: 0 },
          marginRight: { xs: '1em', md: 0 },
        }}
      >
        <RightHome />
      </Box>
    </Box>
  )
}

export default HeroScreen

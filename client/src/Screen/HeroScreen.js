import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import CenterConponent from '../components/CenterConponent'
import LeftNav from '../components/LeftNav'
import RightHome from '../components/RightHome'
import ShowPost from '../components/ShowPost'
import ExploreScreen from './ExploreScreen'
import ProfileScreen from './ProfileScreen'
import TweetsScreen from './TweetsScreen'

const HeroScreen = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'black',
      }}
    >
      {/* left */}
      <Box sx={{ width: '20%', height: '100%' }}>
        <LeftNav />
      </Box>
      {/* middle */}
      <Box
        sx={{
          width: '50%',
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

      <Box sx={{ width: '20%', height: '100%' }}>
        <RightHome />
      </Box>
    </Box>
  )
}

export default HeroScreen

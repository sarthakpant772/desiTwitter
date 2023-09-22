import { StayPrimaryLandscape } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ShowPost from '../components/ShowPost'
import TweetsScreen from './TweetsScreen'

const ProfileScreen = () => {
  const data = useSelector((state) => state.user.data)
  return (
    <Box>
      <Box
        sx={{
          width: '95%',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          sx={{
            width: 'inherit',
            height: '15em',
            backgroundColor: 'primary.light',
            borderColor: 'primary.light',
          }}
        />
        {/* imagebox */}
        <Box
          sx={{
            position: 'relative',
            width: '8em',
            height: '8em',
            display: 'flex',
            alignItems: 'flex-start',
            backgroundColor: 'white',
            right: '37%',
            bottom: '6em',
            borderRadius: '50%',
          }}
        >
          <Box
            component="img"
            sx={{ width: '100%', height: '100%', borderRadius: '50%' }}
            src={data.profileImage}
          />
        </Box>
        {/* bio */}
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="subtutle2"
            sx={{ color: 'primary.contrastText' }}
          >
            {`${data.fname} ${data.lname}`}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="subtutle2"
              sx={{ color: 'secondary.contrastText' }}
            >
              {`@${data.userName}`}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'secondary.light' }}>
              30-DEC
            </Typography>
          </Box>

          <Typography variant="p" sx={{ color: 'primary.contrastText' }}>
            this is fucking shittttttt
          </Typography>
        </Box>
      </Box>
      {/* nav */}
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
            Post
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
            Likes
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
            Media
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
            Saved
          </Typography>
        </Button>
      </Box>
      <Box>
        <ShowPost />
      </Box>
    </Box>
  )
}

export default ProfileScreen

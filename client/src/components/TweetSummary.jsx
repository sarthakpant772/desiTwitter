import { Button } from '@mui/material'
import { Box, Typography } from '@mui/material'
import React from 'react'

const TweetSummary = (props) => {
  return (
    <Box
      sx={{
        marginTop: '1em',
        display: 'flex',
        width: '100%',
        minHeight: '5em',
        backgroundColor: 'primary.light',
        borderRadius: '5px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        sx={{
          marginLeft: '1em',
          marginRight: '1em',
          width: '100%',
          minHeight: '5em',
          backgroundColor: 'primary.light',
          display: 'flex',
          alignItems: 'flex-start', // Align text to the left
          flexDirection: 'column',
          justifyContent: 'left',
        }}
      >
        <Typography
          variant="p"
          color="secondary.contrastText"
          sx={{ textAlign: 'left' }}
        >
          #Comming soon
        </Typography>
        <Typography
          variant="subtitle1"
          color="secondary.light"
          sx={{ textAlign: 'left' }}
        >
          #Comming soon
        </Typography>
        <Typography
          variant="subtitle2"
          color="secondary.light"
          sx={{ textAlign: 'left' }}
        >
          #Comming soon
        </Typography>
      </Button>
    </Box>
  )
}

export default TweetSummary

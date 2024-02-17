import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const TrendingNav = (props) => {
  return (
    <Box sx={{ width: '100%', minHeight: '2.5em', marginTop: '0.5em' }}>
      <Button
        sx={{
          width: '100%',
          minHeight: '30%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="subtitle2" color="secondary.light">
          {`Trending on ${props.trend}`}
        </Typography>
        <Typography variant="p" color="secondary.contrastText">
          {props.hashTag}
        </Typography>
        <Typography variant="subtitle2" color="secondary.light">
          {`${props.numberOfPost} tweets`}
        </Typography>
      </Button>
    </Box>
  )
}

export default TrendingNav

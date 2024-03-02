import { Box, Typography } from '@mui/material'
import React from 'react'

const SingleSms = ({ isSender, sms }) => {
  

  return (
    <Box
      sx={{
        marginTop: '1rem',
        width: '100%',
        height: '2rem',
        display: 'flex',
        justifyContent: `${isSender ? 'flex-end' : 'flex-start'}`,
      }}
    >
      <Box
        sx={{
          margin: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'primary.light',
          minWidth: '4rem',
          padding: '0.2rem',
          height: '100%',
          borderRadius: '20px',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: 'white',
            fontSize: '1.4rem',
            padding: '.2rem',
            marginLeft: '.2rem',
            marginRight: '.2rem',
          }}
        >
          {sms}
        </Typography>
      </Box>
    </Box>
  )
}

export default SingleSms

import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserThumbNail = (props) => {
  const navigate = useNavigate()

  return (
    <Box sx={{ width: '100%', backgroundColor: 'primary.light' }}>
      <Button
        sx={{
          width: '100%',
          height: '4em',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: '1em',
        }}
        onClick={() => navigate(`/user/${props.data.userName}`)}
      >
        <Typography color="primary.contrastText" variant="subtitle2">
          {props.data.fname}
        </Typography>
        <Typography color="primary.contrastText" variant="subtitle2">
          {`@${props.data.userName}`}
        </Typography>
      </Button>
    </Box>
  )
}

export default UserThumbNail

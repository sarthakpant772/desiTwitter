import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const CreateComment = (props) => {
  const [content, setContent] = useState('')
  const userData = useSelector((state) => state.user.data)

  return (
    <Box
      sx={{
        width: '95%',
        minHeight: '13em',
        backgroundColor: 'primary.light',
        borderRadius: '10px',
        marginTop: '1em',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* left */}
      <Box sx={{ width: '10%', height: '100%' }}>
        <Box
          component="img"
          sx={{
            backgroundColor: 'red',
            marginTop: '1em',
            marginLeft: '1em',
            marginRight: '1em',
            height: '2.5em',
            width: '2.5em',
            borderRadius: '50%',
          }}
          src={userData.profileImage}
        />
      </Box>
      {/* right */}
      <Box sx={{ width: '90%', marginRight: '1em' }}>
        <Box sx={{ width: '100%', marginTop: '1em' }}>
          <TextField
            multiline
            minRows={4}
            label="Comment Below"
            InputLabelProps={{
              style: {
                color: 'white', // Set label color to white
              },
            }}
            inputProps={{
              style: {
                color: 'white', // Set input text color to white
              },
            }}
            sx={{
              borderColor: 'primary.contrastText !important', // Set border color to white
              width: '100%',
            }}
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>
        <Box sx={{ marginTop: '1em', marginBottom: '1em' }}>
          <Button
            sx={{
              backgroundColor: 'secondary.contrastText',
              color: 'primary.contrastText',
            }}
            onClick={() => props.func(content)}
          >
            Comment
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateComment

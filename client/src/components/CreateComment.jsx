import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const CreateComment = (props) => {
  const [content, setContent] = useState('')
  const userData = useSelector((state) => state.user.data)
  const handleComment = () => {
    props.func(content)
    setContent('') // Clear the input field after posting the comment
  }
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
      <Box
        sx={{
          width: '10%',
          height: '100%',
          padding: '0.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          sx={{
            display: { xs: 'block' },
            backgroundColor: 'red',
            // marginTop: '1em',
            // marginLeft: '1em',
            // marginRight: '1em',
            // objectFit: 'scale-down',
            // height: '80%',
            width: { xs: '1.5rem', sm: '2.5rem', md: '3rem' },
            height: { xs: '1.5rem', sm: '2.5rem', md: '3rem' },

            borderRadius: '50%',
           
            // zIndex: '100',
          }}
          src={userData.profileImage}
        />
      </Box>
      {/* right */}
      <Box sx={{ width: '90%', marginRight: '1em' }}>
        <Box sx={{ width: '100%', marginTop: '1em' }}>
          <TextField
            multiline
            value={content}
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
            onClick={() => handleComment()}
          >
            Comment
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateComment

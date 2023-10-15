import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const CreatePost = () => {
  const [content, setContent] = useState('')
  const userData = useSelector((state) => state.user.data)

  const handleSubmit = async () => {
    // console.log(content)
    if (content === '') {
      alert('cannot create blank post')
    } else {
      const id = localStorage.getItem('JWT')
      try {
        await axios.post(
          `${process.env.URL}/post/createPost`,
          { content },
          {
            headers: {
              'x-auth-token': id,
            },
          }
        )
        setContent('')
        // Optionally, you can handle success here
      } catch (err) {
        alert('can not post this')
        console.error('Error creating post:', err)
      }
    }
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
            label="Post new masala"
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
              borderColor: '#53af5b !important', // Set border color to white
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
            onClick={() => handleSubmit()}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreatePost

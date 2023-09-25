// import { StayPrimaryLandscape } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ShowPost from '../components/ShowPost'
// import TweetsScreen from './TweetsScreen'

const ProfileScreen = () => {
  const data = useSelector((state) => state.user.data)
  const [post, setPost] = useState([])

  const getAllPost = async () => {
    const id = localStorage.getItem('JWT')
    console.log(id)
    try {
      const response = await axios.get(
        'http://localhost:5000/post/allPostByUserId',
        {
          headers: {
            'x-auth-token': id,
          },
        },
      )
      console.log(response.data) // Check the response data

      // Assuming response.data is an array, return it
      return response.data
    } catch (err) {
      console.log(err)
      return [] // Return an empty array in case of an error
    }
  }

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0]
    const formdata = new FormData()
    formdata.append('file', file)
    const id = localStorage.getItem('JWT')
    try {
      const res = await axios.post(
        'http://localhost:5000/upload/profilePic',
        formdata,
        {
          headers: {
            'x-auth-token': id,
          },
        },
      )
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const postsData = await getAllPost()
      if (Array.isArray(postsData)) {
        setPost(postsData)
      }
    }
    fetchData()
  }, [])

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
          variant="contained"
          component="label"
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
          <input
            onChange={(e) => handleProfilePicChange(e)}
            type="file"
            hidden
          />
          <Box
            component="img"
            sx={{ width: '100%', height: '100%', borderRadius: '50%' }}
            src={`http://localhost:5000/Images/${data.profileImage}`} // Use the selected image or the default profile image
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
      {post.map((postItem, index) => (
        <Box key={index} sx={{ width: '100%', marginTop: '2em' }}>
          <ShowPost data={postItem} />
        </Box>
      ))}
    </Box>
  )
}

export default ProfileScreen

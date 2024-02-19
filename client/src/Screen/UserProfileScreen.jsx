import React, { useEffect, useState } from 'react'
import ShowPost from '../components/ShowPost.jsx'
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'

import { useParams } from 'react-router-dom'

const UserProfileScreen = () => {
  const [data, setData] = useState([])
  const [post, setPost] = useState([])
  const { userName } = useParams()
  const [activeButton, setActiveButton] = useState('Post')

  const handleButtonClick = (button) => {
    setActiveButton(button)
  }

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${process.env.URLS}/user/getUserByName/${userName}`,
      )
      // console.log(res.data)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  const getPostByUserId = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.URLS}/user/getAllPostByUserId/${id}`,
      )
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  const getLikedPost = async () => {
    try {
      const res = await axios.get(
        `${process.env.URLS}/user/likedtweet/${userName}`,
      )
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    console.log(userName)
    const fetchData = async () => {
      const res = await getUserData()
      setData(res)
      if (activeButton === 'Post') {
        const postsData = await getPostByUserId(res._id)
        if (Array.isArray(postsData)) {
          setPost(postsData)
        }
      } else if (activeButton === 'Likes') {
        const postsData = await getLikedPost()
        if (Array.isArray(postsData)) {
          setPost(postsData)
        }
      }
    }
    fetchData()
  }, [userName, activeButton])

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
          src={`${data.profileThumbNail}`}
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
          <Box
            component="img"
            sx={{ width: '100%', height: '100%', borderRadius: '50%' }}
            src={`${data.profileImage}`} // Use the selected image or the default profile image
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
            '&:active': {
              borderBottom: '3px solid red', // Change this to red when active
            },
            borderBottom: activeButton === 'Post' ? '3px solid red' : 'none',
          }}
          onClick={() => handleButtonClick('Post')}
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
            '&:active': {
              borderBottom: '3px solid red', // Change this to red when active
            },
            borderBottom: activeButton === 'Likes' ? '3px solid red' : 'none',
          }}
          onClick={() => handleButtonClick('Likes')}
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
            borderBottom: activeButton === 'Reshare' ? '3px solid red' : 'none',
          }}
          onClick={() => handleButtonClick('Reshare')}
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
            borderBottom: activeButton === 'Saved' ? '3px solid red' : 'none',
          }}
          onClick={() => handleButtonClick('Saved')}
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

export default UserProfileScreen

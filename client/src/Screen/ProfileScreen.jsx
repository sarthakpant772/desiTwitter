// import { StayPrimaryLandscape } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ShowPost from '../components/ShowPost.jsx'
// import TweetsScreen from './TweetsScreen'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB7KVg2VZGY1vzxAcA_csjlwOBbHMT0In8',
  authDomain: 'mybloggingwebsite-93c9c.firebaseapp.com',
  projectId: 'mybloggingwebsite-93c9c',
  storageBucket: 'mybloggingwebsite-93c9c.appspot.com',
  messagingSenderId: '1087955240882',
  appId: '1:1087955240882:web:1c407358b4c9d0c323c6ab',
}

// Initialize Firebase

const ProfileScreen = () => {
  const app = initializeApp(firebaseConfig)
  const storage = getStorage(app)
  const [image, setImage] = useState(
    'https://imgs.search.brave.com/jLTwrBSRPcoyhBJs1uPbMl500isS1N2O0JlI3BLUQoY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc',
  )
  // console.log(storage , 'app')
  const data = useSelector((state) => state.user.data)
  const [post, setPost] = useState([])
  const [activeButton, setActiveButton] = useState('Post')

  const handleButtonClick = (button) => {
    setActiveButton(button)
  }

  const getAllPost = async () => {
    const id = localStorage.getItem('JWT')
    console.log(id)
    try {
      const response = await axios.get(
        `${process.env.URLS}/post/allPostByUserId`,
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
    const storageRef = ref(storage, `profilePicture.${data.userName}`)
    await uploadBytes(storageRef, file)
    const downLoadURl = await getDownloadURL(storageRef)
    setImage(downLoadURl)
    const id = localStorage.getItem('JWT')
    try {
      const res = await axios.post(
        `${process.env.URLS}/upload/profilePic`,
        { file: downLoadURl },
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

  const handlerThumbNailChange = async (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0]
    const storageRef = ref(storage, `profileThumbNail/${data.userName}`)
    await uploadBytes(storageRef, file)
    const downLoadURl = await getDownloadURL(storageRef)
    const id = localStorage.getItem('JWT')
    try {
      const res = await axios.post(
        `${process.env.URLS}/upload/thumbnail`,
        { file: downLoadURl },
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

  const getLikedPost = async () => {
    const id = localStorage.getItem('JWT')
    try {
      const res = await axios.get(`${process.env.URLS}/action/getLikedPost`, {
        headers: {
          'x-auth-token': id,
        },
      })
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const getReshare = async () => {
    const id = localStorage.getItem('JWT')
    try {
      const res = await axios.get(`${process.env.URLS}/action/getReshare`, {
        headers: {
          'x-auth-token': id,
        },
      })
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (activeButton === 'Post') {
        const postsData = await getAllPost()
        if (Array.isArray(postsData)) {
          setPost(postsData)
        }
      } else if (activeButton === 'Likes') {
        const postsData = await getLikedPost()
        if (Array.isArray(postsData)) {
          setPost(postsData)
        }
      } else if (activeButton === 'Reshare') {
        const postsData = await getReshare()
        if (Array.isArray(postsData)) {
          setPost(postsData)
        }
      }
    }
    fetchData()
  }, [activeButton])

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
          variant="contained"
          component="label"
          sx={{
            width: 'inherit',
            height: '15em',
            backgroundColor: 'primary.light',
            borderColor: 'primary.light',
          }}
        >
          <input
            onChange={(e) => handlerThumbNailChange(e)}
            type="file"
            hidden
          />
          <Box
            component="img"
            sx={{ width: '100%', height: '100%' }}
            src={data.profileThumbNail}
          />
        </Box>
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
            src={data.profileImage} // Use the selected image or the default profile image
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

export default ProfileScreen

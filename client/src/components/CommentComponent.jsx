import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputLabel } from '@mui/material'
const CommentComponent = (props) => {
  const [userData, setUserData] = useState([])
  const [date, setDate] = useState()

  const formatDateToDaysAgo = (dateString) => {
    const date = new Date(dateString)
    const currentDate = new Date()
    const timeDifference = currentDate - date
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24))

    if (daysDifference === 1) {
      return '1 day ago'
    } else if (daysDifference > 1) {
      return `${daysDifference} days ago`
    } else {
      return 'Today'
    }
  }

  const getUserData = async () => {
    try {
      const udata = await axios.get(
        `${process.env.URL}/user/user/${props.data.author}`
      )
      return udata.data
    } catch (err) {
      console.log(err)
      return null
    }
  }
  const getCurrentUserData = async () => {
    const id = localStorage.getItem('JWT')
    try {
      const udata = await axios.get(`${process.env.URL}/user/getUser`, {
        headers: {
          'x-auth-token': id,
        },
      })
      return udata.data
    } catch (err) {
      console.log(err)
      return null
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log(props.data?._id)
      // error getting post user and checking [post user only ]
      const user = await getUserData()

      if (user) {
        // console.log(user)
        setUserData(user)
      }
    }

    const formattedDate = formatDateToDaysAgo(props.data?.createdAt)
    setDate(formattedDate)

    fetchData()
  }, [props.data?._id])

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
          src={`${process.env.URL}/Images/${userData.profileImage}`}
        />
      </Box>
      {/* right */}
      <Box sx={{ width: '90%', marginRight: '1em' }}>
        <Box
          sx={{
            minHeight: '1.5em',
            alignItems: 'center',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ color: 'primary.contrastText' }}
            >{`${userData.fname} ${userData.lname}`}</Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
              <Typography
                variant="subtitle2"
                sx={{ color: 'primary.contrastText' }}
              >{`@${userData.userName}`}</Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: 'secondary.contrastText', marginLeft: '1em' }}
              >
                {date}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            marginTop: '1em',
            minHeight: '6em',
            borderStyle: 'solid',
            borderWidth: '.5px',
            borderColor: 'primary.contrastText',
            borderRadius: '10px',
          }}
        >
          <InputLabel
            // disable

            sx={{
              color: 'primary.contrastText',
              // Set border color to white
              margin: '1em',
              width: '100%',
            }}
          >
            {props.data?.content}
          </InputLabel>
        </Box>
      </Box>
    </Box>
  )
}

export default CommentComponent

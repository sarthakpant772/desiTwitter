import { Box, Button, TextField, Typography, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LoopIcon from '@mui/icons-material/Loop'
import SmsIcon from '@mui/icons-material/Sms'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import axios from 'axios'
const ShowPost = (props) => {
  const [userData, setUserData] = useState([])
  const [date, setDate] = useState()
  let temp
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
        `http://localhost:5000/user/user/${props.data.author}`,
      )
      return udata.data
    } catch (err) {
      console.log(err)
      return null
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserData()
      if (user) {
        setUserData(user)
      }
    }

    fetchData()
    setDate(formatDateToDaysAgo(props.data.createdAt))
  }, [props.data.createdAt])

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
          src={props.imgURL}
        />
      </Box>
      {/* right */}
      <Box sx={{ width: '90%', marginRight: '1em' }}>
        <Box sx={{ minHeight: '1.5em', alignItems: 'center', width: '100%' }}>
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
            {props.data.content}
          </InputLabel>
        </Box>
        <Box
          sx={{
            marginTop: '1em',
            marginBottom: '1em',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            sx={{
              //   backgroundColor: 'secondary.contrastText',
              color: 'secondary.contrastText',
            }}
          >
            <FavoriteIcon
              sx={{
                //   backgroundColor: 'secondary.contrastText',
                color: 'secondary.contrastText',
              }}
            />
          </Button>
          <Button
            sx={{
              //   backgroundColor: 'secondary.contrastText',
              color: 'secondary.contrastText',
            }}
          >
            <SmsIcon
              sx={{
                //   backgroundColor: 'secondary.contrastText',
                color: 'secondary.contrastText',
              }}
            />
          </Button>
          <Button
            sx={{
              //   backgroundColor: 'secondary.contrastText',
              color: 'secondary.contrastText',
            }}
          >
            <LoopIcon
              sx={{
                //   backgroundColor: 'secondary.contrastText',
                color: 'secondary.contrastText',
              }}
            />
          </Button>
          <Button
            sx={{
              //   backgroundColor: 'secondary.contrastText',
              color: 'secondary.contrastText',
            }}
          >
            <BookmarkIcon
              sx={{
                //   backgroundColor: 'secondary.contrastText',
                color: 'secondary.contrastText',
              }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ShowPost

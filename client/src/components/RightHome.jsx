import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import TrendingNav from './TrendingNav'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import UserThumbNail from './UserThumbNail'

const RightHome = () => {
  const [userSearched, setUserSearched] = useState('')
  const [searchedUser, setSearchedUser] = useState(null)
  const [onPressEnter, setOnPressEnter] = useState(0)

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      setOnPressEnter(onPressEnter + 1)
    }
  }
  const getSearchedUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.URLS}/action/getUser/${userSearched}`,
      )
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const getData = async () => {
      const check = await getSearchedUser()
      setSearchedUser(check)
      console.log(check)
    }
    if (userSearched != '') getData()
  }, [userSearched])

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '30em',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '4em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '1em',
        }}
      >
        <TextField
          placeholder="Search user by username"
          onKeyDown={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'secondary.contrastText' }} />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setUserSearched(e.target.value)}
          sx={{
            width: '100%',
            borderRadius: '10px',
            backgroundColor: 'primary.light',
            '& input': {
              color: 'white', // Set the input text color to white
            },
          }}
        />
        {searchedUser ? (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              minHeight: '5em',
              position: 'absolute',
              top: '4em',
              backgroundColor: 'primary.main',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            {searchedUser.map((user, index) => (
              <Box sx={{ width: '100%' }} key={index}>
                <UserThumbNail data={user} />
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
      <Paper
        sx={{
          marginTop: '2em',
          width: '100%',
          minHeight: '40%',
          maxHeight: '80%',
          backgroundColor: 'primary.light',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          color="primary.contrastText"
          mt="0.5em"
          ml="0.5em"
        >
          Trending
        </Typography>
        <Box sx={{ width: '100%', height: '90%' }} mt="0.5em" ml="0.5em">
          <TrendingNav
            trend="tech"
            hashTag="#comming soon"
            numberOfPost="12k"
          />
          <TrendingNav
            trend="tech"
            hashTag="#comming soon"
            numberOfPost="12k"
          />
          <TrendingNav
            trend="tech"
            hashTag="#comming soon"
            numberOfPost="12k"
          />
        </Box>
        {/* <TrendingNav trend="tech" hashTag="#thisisfucked" numberOfPost="12k" /> */}
        <Button>
          <Typography sx={{ color: 'secondary.contrastText' }}>More</Typography>
        </Button>
      </Paper>
    </Box>
  )
}

export default RightHome

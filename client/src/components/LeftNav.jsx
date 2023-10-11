import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyLogin } from '../feature/user'
import NavOption from './NavOption'

const LeftNav = () => {
  const dispatch = useDispatch()
  const isUserVerified = useSelector((state) => state.user.verified)
  const [logged, setLogged] = useState(false)
  const [userSearched, setUserSearched] = useState('')

  useEffect(() => {
    dispatch(verifyLogin())
    if (isUserVerified) {
      setLogged(true)
    }
  }, [dispatch, isUserVerified])

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '3em',
          alignItems: 'center',
          marginTop: '1em',
          marginBottom: '1em',
        }}
      >
        <NavOption title="" imgURL="logo.png" url="" />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '3em',
          alignItems: 'center',
          marginTop: '1em',
          marginBottom: '1em',
        }}
      >
        <NavOption title="Home" imgURL="home.svg" url="" />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '3em',
          alignItems: 'center',
          marginTop: '1em',
          marginBottom: '1em',
        }}
      >
        <NavOption title="Explore" imgURL="explore.png" url="/explore" />
      </Box>{' '}
      <Box
        sx={{
          width: '100%',
          height: '3em',
          alignItems: 'center',
          marginTop: '1em',
          marginBottom: '1em',
        }}
      >
        <NavOption title="Bookmarks" imgURL="bookmarks.png" url="/bookmark" />
      </Box>{' '}
      <Box
        sx={{
          width: '100%',
          height: '3em',
          alignItems: 'center',
          marginTop: '1em',
          marginBottom: '1em',
        }}
      >
        {logged ? (
          <NavOption title="Profile" imgURL="profile.png" url="/profile" />
        ) : (
          <NavOption title="LogIn" imgURL="profile.png" url="/login" />
        )}
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '3em',
          alignItems: 'center',
          marginTop: '1em',
          marginBottom: '1em',
        }}
      >
        <NavOption title="More" imgURL="more.png" url="/more" />
      </Box>
    </Box>
  )
}

export default LeftNav

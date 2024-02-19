import { Box, Button, TextField, Typography, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LoopIcon from '@mui/icons-material/Loop'
import SmsIcon from '@mui/icons-material/Sms'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const ShowPost = (props) => {
  const [userData, setUserData] = useState([])
  const [date, setDate] = useState()
  const [like, setLike] = useState(false)
  const [bookmark, setBookmark] = useState(false)
  const [reshare, setReshare] = useState(false)
  const [followed, setFollowed] = useState(false)

  const navigate = useNavigate()

  const handleLike = async () => {
    const id = localStorage.getItem('JWT')

    try {
      await axios.post(
        `${process.env.URLS}/post/likePost/${props.data?._id}`,
        { data: 'hello' },
        {
          headers: {
            'x-auth-token': id,
          },
        },
      )
      setLike(!like)
      console.log('like/unlike')
    } catch (err) {
      console.log(err)
    }
  }

  const handleBookMark = async () => {
    const id = localStorage.getItem('JWT')

    try {
      await axios.post(
        `${process.env.URLS}/action/bookmarkPost`,
        { postId: props.data?._id },
        {
          headers: {
            'x-auth-token': id,
          },
        },
      )

      setBookmark(!bookmark)
      console.log('bookmarked/unbookmarked')
    } catch (err) {
      console.log(err)
    }
  }

  const handleFollow = async () => {
    const id = localStorage.getItem('JWT')

    try {
      const data = await axios.put(
        `${process.env.URLS}/action/follow/${userData._id}`,
        null,
        {
          headers: {
            'x-auth-token': id,
          },
        },
      )
      setFollowed(!followed)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }
  const handleUnFollow = async () => {
    const id = localStorage.getItem('JWT')

    try {
      const data = await axios.put(
        `${process.env.URLS}/action/unfollow/${userData?._id}`,
        null,
        {
          headers: {
            'x-auth-token': id,
          },
        },
      )
      setFollowed(!followed)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleReshare = async () => {
    const id = localStorage.getItem('JWT')

    try {
      await axios.post(
        `${process.env.URLS}/action/reshare`,
        { postId: props.data?._id },
        {
          headers: {
            'x-auth-token': id,
          },
        },
      )
      setReshare(!reshare)
      console.log('reshared/unReshared')
    } catch (err) {
      console.log(err)
    }
  }

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
        `${process.env.URLS}/user/user/${props.data.author}`,
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
      const udata = await axios.get(`${process.env.URLS}/user/getUser`, {
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

      const currentUser = await getCurrentUserData()

      if (user) {
        // console.log(user)
        setUserData(user)

        const isPostLiked =
          Array.isArray(currentUser.likedTweet) &&
          currentUser.likedTweet.includes(props.data?._id)
        setLike(isPostLiked)

        const isBookmarked =
          Array.isArray(currentUser.bookmark) &&
          currentUser.bookmark.includes(props.data?._id)
        setBookmark(isBookmarked)

        const isReshared =
          Array.isArray(currentUser.retweets) &&
          currentUser.retweets.includes(props.data?._id)
        setReshare(isReshared)

        const isFollowed =
          Array.isArray(currentUser.following) &&
          currentUser.following.includes(user?._id)

        setFollowed(isFollowed)
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
      <Box
        sx={{
          width: '10%',
          height: '100%',
          alignItems: 'center',
          padding: '0.5rem',
          display: 'flex',
          justifyContent: 'center',
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
            objectFit: 'scale-down',
            // height: '80%',
            width: { xs: '90%', sm: '80%', md: '50%' },
            height: 'contain',
            borderRadius: '50%',
            // zIndex: '100',
          }}
          src={`${userData.profileImage}`}
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
          <Box
            sx={{
              minWidth: '20%',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {followed ? (
              <Button
                sx={{
                  color: 'primary.contrastText',
                  borderColor: 'primary.contrastText',
                  '&:hover': {
                    borderColor: 'secondary.contrastText',
                  },
                }}
                variant="outlined"
                onClick={() => handleUnFollow()}
              >
                UnFollow
              </Button>
            ) : (
              <Button
                sx={{
                  color: 'primary.contrastText',
                  backgroundColor: 'secondary.contrastText',
                }}
                variant="contained"
                onClick={() => handleFollow()}
              >
                Follow
              </Button>
            )}
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
            onClick={() => handleLike()}
          >
            <FavoriteIcon
              sx={{
                //   backgroundColor: 'secondary.contrastText',
                color: like ? 'secondary.main' : 'secondary.contrastText',
              }}
            />
          </Button>
          <Button
            sx={{
              //   backgroundColor: 'secondary.contrastText',
              color: 'secondary.contrastText',
            }}
            onClick={() => navigate(`/comment/${props?.data?._id}`)}
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
            onClick={() => handleReshare()}
          >
            <LoopIcon
              sx={{
                //   backgroundColor: 'secondary.contrastText',
                color: reshare ? 'secondary.main' : 'secondary.contrastText',
              }}
            />
          </Button>
          <Button
            sx={{
              //   backgroundColor: 'secondary.contrastText',
              color: 'secondary.contrastText',
            }}
            onClick={() => {
              handleBookMark()
            }}
          >
            <BookmarkIcon
              sx={{
                //   backgroundColor: 'secondary.contrastText',
                color: bookmark ? 'secondary.main' : 'secondary.contrastText',
              }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ShowPost

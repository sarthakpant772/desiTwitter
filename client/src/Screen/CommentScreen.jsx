import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CreateComment from '../components/CreateComment'
import ShowPost from '../components/ShowPost.jsx'

const CommentScreen = (props) => {
  const userId = localStorage.getItem('JWT')
  const { id } = useParams()
  const [data, setData] = useState([])
  const [comment, setComment] = useState([])

  const handleComment = async (e) => {
    console.log(e)

    try {
      await axios.post(
        `http://localhost:5000/post/comment/${id}`,
        {
          commentText: e,
        },
        {
          headers: {
            'x-auth-token': userId,
          },
        },
      )
      console.log(`comment added`)
    } catch (err) {
      alert(`cannot comment on the post now`)
    }
  }
  const fetchComment = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/post/allComment/${id}`)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  const fetchData = async () => {
    console.log(id)
    try {
      const res = await axios.get(`http://localhost:5000/post/postById/${id}`)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const d = await fetchData()
      const c = await fetchComment()
      setData(d)
      setComment(c)
    }
    console.log(comment)
    getData()
  }, [id])
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1em',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ShowPost data={data} />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CreateComment func={handleComment} />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {comment?.map((oneData, index) => (
          <ShowPost key={index} data={oneData} />
        ))}
      </Box>
    </Box>
  )
}

export default CommentScreen

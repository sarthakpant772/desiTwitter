import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CreateComment from '../components/CreateComment'
import ShowPost from '../components/ShowPost.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { makeAlert } from '../feature/alert.js'
import { getComments, postComment } from '../feature/tweetsAction.js'

const CommentScreen = (props) => {
  const userId = localStorage.getItem('JWT')
  const { id } = useParams()
  const [data, setData] = useState([])
  // const [comment, setComment] = useState([])
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  const comment = useSelector((state) => state.tweetsAction.comments)
  dispatch(getComments({ id: id }))
  const handleComment = async (e) => {
    console.log(e)
    dispatch(postComment({ comment: e, id }))
    // try {
    //   await axios.post(
    //     `${process.env.URLS}/post/comment/${id}`,
    //     {
    //       commentText: e,
    //     },
    //     {
    //       headers: {
    //         'x-auth-token': userId,
    //       },
    //     },
    //   )
    //   dispatch(
    //     makeAlert({
    //       statu: 'success',
    //       message: 'comment added',
    //     }),
    //   )
    //   setNewComment('')
    // } catch (err) {
    //   dispatch(
    //     makeAlert({
    //       statu: 'error',
    //       message: 'cannot add comments now',
    //     }),
    //   )
    // }
  }
  // const fetchComment = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.URLS}/post/allComment/${id}`)
  //     return res.data
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  const fetchData = async () => {
    console.log(id)
    try {
      const res = await axios.get(`${process.env.URLS}/post/postById/${id}`)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const d = await fetchData()
      // const c = await fetchComment()

      setData(d)
      // setComment(c)
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

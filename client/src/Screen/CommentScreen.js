import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CreateComment from '../components/CreateComment'
import ShowPost from '../components/ShowPost'

const CommentScreen = () => {
  const { id } = useParams()
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/post/allpost')
      console.log(res.data)
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
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
        <ShowPost />
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
        <CreateComment />
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
        {data.map((oneData, index) => (
          <ShowPost key={index} data={oneData} />
        ))}
      </Box>
    </Box>
  )
}

export default CommentScreen

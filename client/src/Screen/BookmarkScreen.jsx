import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ShowPost from '../components/ShowPost.jsx'

const BookmarkScreen = () => {
  const [data, setData] = useState([])
  const userId = localStorage.getItem('JWT')
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.URL}/action/getBookmarkPost`,
        {
          headers: {
            'x-auth-token': userId,
          },
        },
      )
      console.log('data', res.data)
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box sx={{ width: '100%', marginTop: '2em' }}>
      {data.map((oneData, index) => (
        <ShowPost data={oneData} key={index} />
      ))}
    </Box>
  )
}

export default BookmarkScreen

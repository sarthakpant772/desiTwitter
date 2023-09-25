import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ShowPost from '../components/ShowPost'

const BookmarkScreen = () => {
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
    <Box sx={{ width: '100%', marginTop: '2em' }}>
      {/* {data.map((oneData, index) => ( */}
      <ShowPost />
      {/* ))} */}
    </Box>
  )
}

export default BookmarkScreen

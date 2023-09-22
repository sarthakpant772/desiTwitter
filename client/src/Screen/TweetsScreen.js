import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CenterConponent from '../components/CenterConponent'
import ShowPost from '../components/ShowPost'

const TweetsScreen = () => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/post/allpost')
      // console.log(res.data)
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box>
      <Box sx={{ width: '100%', marginBottom: '2em' }}>
        <CenterConponent />
      </Box>
      {data.map((oneData, index) => (
        <Box key={index} sx={{ width: '100%', marginTop: '2em' }}>
          <ShowPost data={oneData} />
        </Box>
      ))}
    </Box>
  )
}

export default TweetsScreen

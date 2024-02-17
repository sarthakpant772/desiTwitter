import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import CenterConponent from '../components/CenterConponent'
import ShowPost from '../components/ShowPost.jsx'

const TweetsScreen = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  const observer = useRef()

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.URLS}/post/allpost/${page}/10`)
      console.log(res.data)
      setData((prevData) => [...prevData, ...res.data])
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [page])
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1) // Increase page number when reaching end of screen
      }
    })

    observer.current.observe(document.querySelector('.end-of-screen'))

    return () => {
      observer.current.disconnect() // Clean up observer
    }
  }, [])
  return (
    <Box>
      <Box sx={{ width: '100%', marginBottom: '2em' }}>
        <CenterConponent />
      </Box>
      <Box sx={{ width: '100%', marginTop: '2em' }}>
        {data.map((oneData, index) => (
          <ShowPost key={index} data={oneData} />
        ))}
        <div className="end-of-screen" style={{ height: '10px' }}></div>{' '}
        {/* An element to observe for intersection */}
      </Box>
    </Box>
  )
}

export default TweetsScreen

import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SingleSms from './SingleSms'
import SendIcon from '@mui/icons-material/Send'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

const PersonalText = ({ roomId }) => {
  const [msg, setMsg] = useState('')
  const [getAllMsg, setGetAllMsg] = useState([])
  const [prevMsg, setPrevMsg] = useState([])
  const { receiverId } = useParams()
  const id = localStorage.getItem('JWT')
  const userName = useSelector((state) => state.user.data.userName)

  const getAllMsgData = async () => {
    try {
      const data = await axios.post(
        `${process.env.URLS}/chat/getSms`,
        {
          receiverId: receiverId,
        },
        {
          headers: {
            'x-auth-token': id,
          },
        },
      )
      setPrevMsg(data.data.chat)

      console.log(data.data.chat)
    } catch (err) {
      console.log(err)
    }
  }
  // var socket
  const socket = io(`${process.env.URLS}`)
  if (userName && receiverId) {
    socket.on('connection')
    socket.emit('join', {
      senderId: userName,
      receiverId: receiverId,
    })
  }

  //  recieve data form socket
  socket.on('recievedMsg', (data) => {
    const newArrat = [...prevMsg, data]
    setPrevMsg(newArrat)
    console.log(data)
  })

  useEffect(() => {
    getAllMsgData()
  }, [])
  // const handleSend = async () => {
  //   // Implement logic to send the message
  //   console.log('Sending message:', msg)

  //   try {
  //     const sendData = await axios.put(
  //       `${process.env.URLS}/chat/sendmsg`,
  //       {
  //         msg: msg,
  //         receiverId: receiverId,
  //       },
  //       {
  //         headers: {
  //           'x-auth-token': id,
  //         },
  //       },
  //     )

  //     const data = {
  //       msg: msg,
  //       sender: userName,
  //     }

  //     console.log(data)
  //     const newArrat = [...prevMsg, data]
  //     setPrevMsg(newArrat)

  //     socket.emit('send', {
  //       senderId: userName,
  //       receiverId: receiverId,
  //       msg: msg,
  //     })
  //     setMsg('')
  //   } catch (err) {
  //     console.log(err)
  //   }
  //   // Clear the message input after sending
  // }

  const handleSend = async () => {
    try {
      // Send the message
      const sendData = await axios.put(
        `${process.env.URLS}/chat/sendmsg`,
        {
          msg: msg,
          receiverId: receiverId,
        },
        {
          headers: {
            'x-auth-token': id,
          },
        },
      )

      // Construct the message object
      const newMessage = {
        msg: msg,
        sender: userName,
      }

      // Update the previous messages array with the new message
      setPrevMsg((prevMsg) => [...prevMsg, newMessage])

      // Emit the message via socket
      socket.emit('send', {
        senderId: userName,
        receiverId: receiverId,
        msg: msg,
      })

      // Clear the message input after sending
      setMsg('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ height: '90vh', width: '100%', overflowY: 'scroll' }}>
        {prevMsg.map((sms) => {
          console.log(sms.sender, userName, sms.sender === userName)
          return (
            <SingleSms
              sms={sms.msg}
              isSender={sms.sender === userName || !sms.sender ? true : false}
            />
          )
        })}
      </Box>
      <Box
        sx={{
          height: '10dvh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Parent container for TextField and Button */}
        <Box sx={{ width: '90%', display: 'flex', alignItems: 'center' }}>
          {/* Button to send the message */}

          {/* TextField for typing the message */}
          <TextField
            sx={{
              backgroundColor: 'primary.light',
              borderColor: 'white',
              flex: 1, // Take remaining space in the parent container
              '& .MuiInputBase-input': {
                color: 'white', // Set text color to white
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Set label color to white
              },
            }}
            label="Type your msg"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => handleSend()}
            sx={{ height: '100%' }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PersonalText

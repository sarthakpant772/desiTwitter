import React, { useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { verifyLogin } from '../feature/user'
const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    password: '',
    username: '',
  })
  console.log(`${process.env.URLS}/user/login`)

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${process.env.URLS}/user/login`, form)
      console.log(res)
      localStorage.setItem('JWT', res.data.token)
      dispatch(verifyLogin())
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        sx={{
          width: '34em',
          minHeight: '25em',
          backgroundColor: 'primary.light',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        ml="1em"
        mr="1em"
      >
        <Box sx={{ width: '90%', height: '90%' }}>
          <Box
            sx={{
              width: '100%',
              minHeight: '2em',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" sx={{ color: 'secondary.light' }}>
              Log In
            </Typography>
            {/* <hr style={{ width: '80%', margin: '10px 0' }} /> */}
            {/* Horizontal line */}
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '1em',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                borderBottom: '2px solid #CF0A0A', // Horizontal line style
                marginTop: '10px', // Adjust margin as needed
              }}
            />
          </Box>

          <Box
            sx={{
              widtg: '100%',
              height: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <TextField
              sx={{
                marginTop: '1em',
                backgroundColor: 'secondary.light',
                borderRadius: '10px',
              }}
              label="Username"
              variant="outlined"
              onChange={(e) => {
                setForm({ ...form, username: e.target.value })
              }}
            />
            <TextField
              sx={{
                marginTop: '1em',
                backgroundColor: 'secondary.light',
                borderRadius: '10px',
              }}
              label="Password"
              variant="outlined"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value })
              }}
            />
            <Button
              variant="contained"
              sx={{
                marginTop: '1em',
                height: '4em',
                borderRadius: '10px',
                backgroundColor: 'secondary.contrastText',
              }}
              onClick={() => handleSubmit()}
            >
              Login
            </Button>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '1em',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                borderBottom: '2px solid #CF0A0A', // Horizontal line style
                marginTop: '10px', // Adjust margin as needed
              }}
            />
          </Box>
          <Box
            sx={{ marginTop: '1em', display: 'flex', flexDirection: 'column' }}
          >
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              sx={{
                // marginButtom: '2em',
                marginBottom: '1em',
                height: '4em',
                borderRadius: '10px',
                backgroundColor: 'secondary.contrastText',
              }}
            >
              Sign up
            </Button>
            <Box sx={{ marginBottom: '1em' }}>
              <div
                id="g_id_onload"
                data-client_id="669192955024-2imn4rdubqt15hecpqh0dm5ih9evlu9b.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-login_uri="http://localhost:3000/login"
                data-itp_support="true"
              ></div>

              <div
                class="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
              ></div>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginScreen

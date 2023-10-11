import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

const SignupScreen = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    fname: '',
    lname: '',
    password: '',
    userName: '',
  })

  const [confirmPassword, setConfirmPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState()
  const handleSubmit = async () => {
    const requiredFields = ['fname', 'email', 'userName', 'password']
    const areAllRequiredFieldsFilled = requiredFields.every(
      (field) => form[field] !== '',
    )
    if (areAllRequiredFieldsFilled === false) {
      alert('Fill all the required fields')
    }
    if (checkPassword === false) {
      try {
        const data = axios.post('http://localhost:5000/user/signup', form)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
      // console.log(form)
      navigate('/')
    } else {
      alert('some fields are not correct')
    }
  }

  useEffect(() => {
    console.log(checkPassword)
    if (form.password === confirmPassword) {
      setCheckPassword(false)
    } else {
      setCheckPassword(true)
    }
  }, [confirmPassword])

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
              Sign-up
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
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TextField
                sx={{
                  marginTop: '1em',
                  backgroundColor: 'secondary.light',
                  borderRadius: '10px',
                }}
                required
                label="First Name"
                variant="outlined"
                onChange={(e) => {
                  setForm({ ...form, fname: e.target.value })
                }}
              />
              <TextField
                sx={{
                  marginTop: '1em',
                  backgroundColor: 'secondary.light',
                  borderRadius: '10px',
                }}
                label="Last Name"
                variant="outlined"
                onChange={(e) => {
                  setForm({ ...form, lname: e.target.value })
                }}
              />
            </Box>
            <TextField
              sx={{
                marginTop: '1em',
                backgroundColor: 'secondary.light',
                borderRadius: '10px',
              }}
              required
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setForm({ ...form, email: e.target.value })
              }}
            />
            <TextField
              sx={{
                marginTop: '1em',
                backgroundColor: 'secondary.light',
                borderRadius: '10px',
              }}
              required
              label="Username"
              variant="outlined"
              onChange={(e) => {
                setForm({ ...form, userName: e.target.value })
              }}
            />
            <TextField
              sx={{
                marginTop: '1em',
                backgroundColor: 'secondary.light',
                borderRadius: '10px',
              }}
              required
              label="Password"
              variant="outlined"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value })
              }}
            />
            <TextField
              sx={{
                marginTop: '1em',
                backgroundColor: 'secondary.light',
                border: checkPassword ? '5px solid #CF0A0A' : 'transparent',
                borderRadius: '10px',
              }}
              required
              label="Verify password"
              variant="outlined"
              onChange={(e) => {
                setConfirmPassword(e.target.value)
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
              Sign-up
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
          <Box sx={{ marginTop: '1em', marginBottom: '1em' }}>
            <div
              id="g_id_onload"
              data-client_id="669192955024-2imn4rdubqt15hecpqh0dm5ih9evlu9b.apps.googleusercontent.com"
              data-context="signin"
              data-ux_mode="popup"
              data-login_uri="http://localhost:3000/signup"
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
      </Paper>
    </Box>
  )
}

export default SignupScreen

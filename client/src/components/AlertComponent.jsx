import { Box, Alert, setRef } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeAlertClear } from '../feature/alert'

const AlertComponent = () => {
  const status = useSelector((state) => state.alert.status)
  const message = useSelector((state) => state.alert.message)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if (status != '') {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
        dispatch(makeAlertClear())
      }, 5000)
    }
  }, [status])
  return (
    <>
      {visible ? (
        <Box
          sx={{
            width: '100%',

            position: 'absolute',
            zIndex: '100',
            top: '90%',
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'end' },
            alignItems: { xs: 'center', sm: 'end' },
          }}
        >
          <Box
            sx={{
              width: { xs: '90%', sm: '50%', md: '25%', lg: '20%' },
              // marginLeft: { xs: '0', sm: '2rem' },
            }}
          >
            <Alert severity={status} sx={{ margin: '2rem' }}>
              {message}
            </Alert>
          </Box>
        </Box>
      ) : null}
    </>
  )
}

export default AlertComponent

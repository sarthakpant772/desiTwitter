import React from 'react'
import Box from '@mui/material/Box'
import HeroScreen from './Screen/HeroScreen'
import { createTheme, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { Login } from '@mui/icons-material'
import LoginScreen from './Screen/LoginScreen'
import SignupScreen from './Screen/SignupScreen'
import TweetsScreen from './Screen/TweetsScreen'
import ExploreScreen from './Screen/ExploreScreen'
import ProfileScreen from './Screen/ProfileScreen'
import { store } from './app/store'
import { Provider } from 'react-redux'
import BookmarkScreen from './Screen/BookmarkScreen'
import CommentScreen from './Screen/CommentScreen'

const App = () => {
  const theme = createTheme({
    palette: {
      common: {
        black: '#000',
        white: '#fff',
      },
      primary: {
        main: '#000',
        light: 'rgb(22, 24, 28)',
        contrastText: '#EEEEEE',
      },
      secondary: {
        main: '#DBE2EF',
        // light: '#F9C80E',
        light: '#F9F7F7',
        dark: '#F9C80E',
        contrastText: '#CF0A0A',
      },
    },
    typography: {
      h1: {
        fontFamily: 'Poppins',
      },
      h2: {
        fontFamily: 'Poppins',
      },
      h3: {
        fontFamily: 'Poppins',
      },
      h4: {
        fontFamily: 'Poppins',
      },
      subtitle1: {
        fontSize: '.2rem',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Box
          sx={{
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: 'primary.main',
          }}
        >
          <Routes>
            <Route path="/" element={<HeroScreen />}>
              <Route path="/" element={<TweetsScreen />} />
              <Route path="/explore" element={<ExploreScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/bookmark" element={<BookmarkScreen />} />
              <Route path="/comment/:id" element={<CommentScreen />} />
            </Route>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
          </Routes>
        </Box>
      </Provider>
    </ThemeProvider>
  )
}

export default App

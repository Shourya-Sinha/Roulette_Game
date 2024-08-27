import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <>
    <Box sx={{backgroundColor:'#e6f4ff'}}>
    <Header />
    <Box sx={{minHeight:'80vh'}}>
    <Outlet />
    </Box>

    <Footer />
    </Box>
    </>
  )
}

export default Layout
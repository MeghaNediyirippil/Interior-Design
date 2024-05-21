import React from 'react'
import { Box, Grid, Paper, styled } from '@mui/material'
import './Gallery.css'
import img1 from '../../Assets/image1.jpg'
import img2 from '../../Assets/image2.jpg'
import img3 from '../../Assets/image3.jpg'



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Gallery() {
  return (
    <div className='gallery'>
    <span className='gallery-heading'>GALLERY</span>
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={8} >
                <Item className='gallery-img-wrapper'>
                    <img src={img1} alt="" className='gallery-img' />
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item className='gallery-img-wrapper'>
                    <img src={img2} alt="" className='gallery-img' />
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item className='gallery-img-wrapper'>
                    <img src={img3} alt="" className='gallery-img' />
                </Item>
            </Grid>
            <Grid item xs={8}>
                <Item className='gallery-img-wrapper'>
                    <img src={img1} alt="" className='gallery-img' />
                </Item>
            </Grid>
            <Grid item xs={8}>
                <Item className='gallery-img-wrapper'>
                    <img src={img2} alt="" className='gallery-img' />
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item className='gallery-img-wrapper'>
                    <img src={img3} alt="" className='gallery-img' />

                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item className='gallery-img-wrapper'>
                    <img src={img1} alt="" className='gallery-img' />
                </Item>
            </Grid>
            <Grid item xs={8}>
                <Item className='gallery-img-wrapper'>
                    <img src={img3} alt="" className='gallery-img' />
                </Item>
            </Grid>
        </Grid>
    </Box>
</div>
  )
}

export default Gallery

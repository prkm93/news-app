import React, {useState, useEffect} from "react";
import axios from "axios";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NewsDetails from './NewsDetails';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  

const News = () => {

    const [newsDetails, setNewsDetails] = useState([]);
    const [limitedNews, setLimitedNews] = useState([]);
    const API_URL = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/newsf6e2440.json';
    
    useEffect(() => {
        fetchNewsDetails();
    }, []);
      
    const fetchNewsDetails =  async () => {
        try {
            const response = await axios.get(API_URL);

            if (response.status == 200) {
                console.log(response.data);
                setNewsDetails(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Container maxWidth="xl">
                <h1>News Details</h1>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3, lg: 1 }} columns={{ xs: 3, sm: 8, md: 12 }}>
                        {
                            newsDetails 
                            && 
                            Array.isArray(newsDetails) && 
                            [...new Map(newsDetails.map(el => [el["PUBLISHER"], el])).values()] // filtering unique elements based on publisher
                            .map((item) => {
                                const { ID, TITLE, PUBLISHER, TIMESTAMP } = item;
                                let newDate = new Date(TIMESTAMP);
                                return (
                                    <Grid item xs={2} sm={3} md={3} key={ID}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                {TITLE}
                                                </Typography>
                                            </CardContent>
                                            <CardActions >
                                                <Link to={`/${PUBLISHER.split(" ").join("")}`}><Button variant="contained">{PUBLISHER}</Button></Link>
                                                <Routes>
                                                    <Route exact path={`/${PUBLISHER.split(" ").join("")}`} element={<NewsDetails/>}></Route>
                                                </Routes>
                                                <Button size="small" style={{marginLeft: "30px"}}>{`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`}</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default News;
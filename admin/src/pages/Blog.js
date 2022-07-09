import axios from 'axios';
import { React, useEffect, useState } from 'react';
// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
//
import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [{ value: 'latest', label: 'Mới nhất' }];

// ----------------------------------------------------------------------

export default function Blog() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getData = async () => {
      axios
        .post('http://localhost:8080/comestic/public/api/getAllPost')
        .then((response) => {
          setPost(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Bài Viết
          </Typography>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={post} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {post.map((post, index) => (
            <BlogPostCard key={post.Post_id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

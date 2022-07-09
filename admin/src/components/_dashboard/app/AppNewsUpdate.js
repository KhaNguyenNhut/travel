import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
// material
import { Box, Button, Card, CardHeader, Divider, Link, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TimeAgo from 'react-timeago';
//
import Scrollbar from '../../Scrollbar';

// -----------------------------------------------------------------------------------------

export default function AppNewsUpdate() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getData = async () => {
      axios
        .get('http://localhost:3001/api/post')
        .then((response) => {
          setPost(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);
  return (
    <Card>
      <CardHeader title="Bài viết mới" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {post.map((news) => (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                component="img"
                alt=""
                src={`http://localhost:3000/${news.user[0].avatar}`}
                sx={{ width: 48, height: 48, borderRadius: 1.5 }}
              />
              <Box sx={{ minWidth: 240 }}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                  <Typography variant="subtitle2" noWrap>
                    {news.user[0].name}
                  </Typography>
                </Link>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {news.content}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                <TimeAgo date={news.createdAt} />
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="/dashboard/blog"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          Xem tất cả
        </Button>
      </Box>
    </Card>
  );
}

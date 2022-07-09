import { Icon } from '@iconify/react';
import ProfileOutlined from '@iconify/icons-ant-design/profile-outlined';
import axios from 'axios';
import { React, useState, useEffect } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import postApi from '../../../api/postApi';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppWeeklySales() {
  const [countNews, setCountNews] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        const post = await postApi.getAllPost();
        setCountNews(Object.keys(post).length);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  function loadPage() {
    window.location.href = 'http://localhost:3002/dashboard/blog';
  }
  return (
    <RootStyle onClick={() => loadPage()} style={{ cursor: 'pointer' }}>
      <IconWrapperStyle>
        <Icon icon={ProfileOutlined} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{countNews}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Bài viết
      </Typography>
    </RootStyle>
  );
}

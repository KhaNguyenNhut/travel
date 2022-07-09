import { Icon } from '@iconify/react';
import BugOutlined from '@iconify/icons-ant-design/bug-outlined';
import axios from 'axios';
import { React, useState, useEffect } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
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
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 234;

export default function AppBugReports() {
  const [countReport, setCountReport] = useState(0);
  useEffect(() => {
    const getData = async () => {
      axios
        .get('http://localhost:3001/api/report')
        .then((response) => {
          setCountReport(Object.keys(response.data).length);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  function loadPage() {
    window.location.href = 'http://localhost:3001/dashboard/report';
  }
  return (
    <RootStyle onClick={() => loadPage()} style={{ cursor: 'pointer' }}>
      <IconWrapperStyle>
        <Icon icon={BugOutlined} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(countReport)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Báo cáo
      </Typography>
    </RootStyle>
  );
}

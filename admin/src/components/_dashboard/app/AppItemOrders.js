import { Icon } from '@iconify/react';
import axios from 'axios';
import { React, useState, useEffect } from 'react';
import GiftOutlined from '@iconify/icons-ant-design/gift-outlined';
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
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
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
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1723315;

export default function AppItemOrders() {
  const [countProducts, setCountProducts] = useState(0);
  useEffect(() => {
    const getData = async () => {
      axios
        .post('http://localhost:8080/comestic/public/api/countProducts')
        .then((response) => {
          setCountProducts(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  function loadPage() {
    window.location.href = 'http://localhost:3001/dashboard/products';
  }
  return (
    <RootStyle onClick={() => loadPage()} style={{ cursor: 'pointer' }}>
      <IconWrapperStyle>
        <Icon icon={GiftOutlined} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(countProducts)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Sản phẩm
      </Typography>
    </RootStyle>
  );
}

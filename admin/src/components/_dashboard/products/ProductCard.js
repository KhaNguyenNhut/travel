// material
import { Box, Card, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import './product.css';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { status } = product;

  function navInfo(product) {
    localStorage.setItem('productId', product.Product_id);
    window.location.href = 'http://localhost:3001/dashboard/products/info';
  }

  function handleAddProducts() {
    console.log(product.Product_id);
  }

  return (
    <Card className="product-card" onClick={() => navInfo(product)}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <lable
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </lable>
        )}
        <ProductImgStyle
          alt={product.Product_name}
          src={`http://localhost:3000${product.Product_image}`}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {product.Product_name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">{product.Product_price} đ</Typography>
          <Typography variant="subtitle1">{product.Product_weight}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

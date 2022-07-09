import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
// components
import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/products';
import './css/Input.css';

// ----------------------------------------------------------------------
export default function Register() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getData = async () => {
      axios
        .post('http://localhost:8080/comestic/public/api/getSuggestProduct')
        .then((response) => {
          // console.log(response.data.data);
          setProduct(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  function InputFieldUI(props) {
    const { field, form, type, label, placeholder, disabled, loginErrors } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = (errors[name] && touched[name]) || loginErrors;
    return (
      <div className={`input-container ${disabled ? 'disabled' : ''}`}>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          {...field}
          type={type}
          placeholder={placeholder}
          style={disabled ? { backgroundColor: '#f2f2f2', border: 'none' } : {}}
          className={showError ? 'errors' : undefined}
          readOnly={disabled}
        />
        {showError && <span className="message-error">{errors[name]}</span>}
      </div>
    );
  }
  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Typography
          variant="h4"
          sx={{ mb: 5 }}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          Sản phẩm
        </Typography>
        <ProductList products={product} />
      </Container>
    </Page>
  );
}

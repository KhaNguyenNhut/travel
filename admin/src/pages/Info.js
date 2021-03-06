import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { FastField, Form, Formik } from 'formik';
import { React, useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import * as yup from 'yup';
import './css/info.css';
import './css/Input.css';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 20,
  borderRadius: 2,
  p: 4
};

function Info() {
  const [open, setOpen] = useState(false);
  const [listInfo, setListInfo] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    Product_id: listInfo ? listInfo.Product_id : '',
    Product_name: listInfo ? listInfo.Product_name : '',
    Product_brand: listInfo ? listInfo.Product_brand : '',
    Product_price: listInfo ? listInfo.Product_price : '',
    Product_weight: listInfo ? listInfo.Product_weight : '',
    Category: listInfo ? listInfo.Category : '',
    Category_detail: listInfo ? listInfo.Category_detail : ''
  };

  const validationSchema = yup.object().shape({
    Product_name: yup.string().required('Vui l??ng ki???m tra T??n s???n ph???m c???a b???n!'),
    Product_brand: yup.string().required('Vui l??ng ki???m tra Th????ng hi???u c???a b???n!'),
    Product_price: yup.string().required('Vui l??ng ki???m tra Gi?? c???a b???n!'),
    Product_weight: yup.string().required('Vui l??ng ki???m tra Tr???ng l?????ng c???a b???n!'),
    Category: yup.string().required('Vui l??ng ki???m tra Lo???i c???a b???n!'),
    Category_detail: yup.string().required('Vui l??ng ki???m tra Chi ti???t lo???i c???a b???n!')
  });

  const data = {
    idProduct: localStorage.getItem('productId')
  };

  useEffect(() => {
    const getData = async () => {
      axios
        .post('http://localhost:8080/comestic/public/api/getInfoProduct', data)
        .then((response) => {
          setListInfo(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  function handleDelete() {
    const dataDelete = {
      idProduct: localStorage.getItem('productId')
    };
    axios
      .post('http://localhost:8080/comestic/public/api/deleteProduct', dataDelete)
      .then((response) => {
        window.location.href = 'http://localhost:3001/dashboard/products';
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleAddProducts(product) {
    const data = {
      id: product
    };
    axios
      .post('http://localhost:8080/comestic/public/api/statusProduct', data)
      .then((response) => {
        window.location.href = 'http://localhost:3001/dashboard/suggest';
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function renderElement() {
    if (listInfo.status !== null)
      return (
        <Button variant="contained" onClick={() => handleAddProducts(listInfo.Product_id)}>
          Th??m s???n ph???m
        </Button>
      );
    return null;
  }

  return (
    <div className="info-page">
      <div className="title-page">
        <h2>Chi ti???t s???n ph???m</h2>
        <div className="info-btn">
          {renderElement()}
          <Button onClick={handleOpen} variant="contained">
            Ch???nh s???a
          </Button>
          <Button onClick={() => handleDelete()} variant="contained" className="cancel">
            X??a
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ch???nh s???a
              </Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (value) => {
                  axios
                    .post('http://localhost:8080/comestic/public/api/editProductInfo', value)
                    .then((response) => {
                      axios
                        .post('http://localhost:8080/comestic/public/api/getInfoProduct', data)
                        .then((response) => {
                          setListInfo(response.data.data);
                          handleClose();
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                {() => (
                  <Form>
                    <FastField
                      name="Product_name"
                      component={InputFieldUI}
                      label="T??n s???n ph???m "
                      type="text"
                    />
                    <FastField
                      name="Product_brand"
                      component={InputFieldUI}
                      label="Th????ng hi???u"
                      type="text"
                    />
                    <FastField
                      name="Product_price"
                      component={InputFieldUI}
                      label="Gi??"
                      type="text"
                    />
                    <FastField
                      name="Product_weight"
                      component={InputFieldUI}
                      label="Tr???ng l?????ng"
                      type="text"
                    />
                    <FastField
                      name="Category"
                      component={InputFieldUI}
                      label="Lo???i 1"
                      type="text"
                      disabled="true"
                    />
                    <FastField
                      name="Category_detail"
                      component={InputFieldUI}
                      label="Lo???i 2"
                      type="text"
                      disabled="true"
                    />
                    <Button variant="contained" type="submit" style={{ marginTop: 20 }}>
                      X??c Nh???n
                    </Button>
                    <Button
                      className="cancel"
                      variant="contained"
                      style={{ marginTop: 20 }}
                      onClick={handleClose}
                    >
                      H???y B???
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="info-container">
        <div className="image-product">
          <img src={`http://localhost:3000/${listInfo.Product_image}`} alt="" />
        </div>
        <div className="info-product">
          <div className="info-label">
            <p>ID s???n ph???m:</p>
            <p>T??n s???n ph???m:</p>
            <p>Th????ng hi???u:</p>
            <p>Gi??:</p>
            <p>Tr???ng l?????ng:</p>
            <p>Lo???i 1:</p>
            <p>Lo???i 2:</p>
            <p>???????c ????nh gi??: </p>
          </div>
          <div className="info-detail">
            <p>{listInfo.Product_id}</p>
            <p>{listInfo.Product_name}</p>
            <p>{listInfo.Product_brand}</p>
            <p style={{ color: 'red' }}>{listInfo.Product_price} ??</p>
            <p>{listInfo.Product_weight}</p>
            <p>{listInfo.Category}</p>
            <p>{listInfo.Category_detail}</p>
            <Rating className="rating" name="disabled" value={listInfo.evalute} disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;

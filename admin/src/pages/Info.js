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
    Product_name: yup.string().required('Vui lòng kiểm tra Tên sản phẩm của bạn!'),
    Product_brand: yup.string().required('Vui lòng kiểm tra Thương hiệu của bạn!'),
    Product_price: yup.string().required('Vui lòng kiểm tra Giá của bạn!'),
    Product_weight: yup.string().required('Vui lòng kiểm tra Trọng lượng của bạn!'),
    Category: yup.string().required('Vui lòng kiểm tra Loại của bạn!'),
    Category_detail: yup.string().required('Vui lòng kiểm tra Chi tiết loại của bạn!')
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
          Thêm sản phẩm
        </Button>
      );
    return null;
  }

  return (
    <div className="info-page">
      <div className="title-page">
        <h2>Chi tiết sản phẩm</h2>
        <div className="info-btn">
          {renderElement()}
          <Button onClick={handleOpen} variant="contained">
            Chỉnh sửa
          </Button>
          <Button onClick={() => handleDelete()} variant="contained" className="cancel">
            Xóa
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Chỉnh sửa
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
                      label="Tên sản phẩm "
                      type="text"
                    />
                    <FastField
                      name="Product_brand"
                      component={InputFieldUI}
                      label="Thương hiệu"
                      type="text"
                    />
                    <FastField
                      name="Product_price"
                      component={InputFieldUI}
                      label="Giá"
                      type="text"
                    />
                    <FastField
                      name="Product_weight"
                      component={InputFieldUI}
                      label="Trọng lượng"
                      type="text"
                    />
                    <FastField
                      name="Category"
                      component={InputFieldUI}
                      label="Loại 1"
                      type="text"
                      disabled="true"
                    />
                    <FastField
                      name="Category_detail"
                      component={InputFieldUI}
                      label="Loại 2"
                      type="text"
                      disabled="true"
                    />
                    <Button variant="contained" type="submit" style={{ marginTop: 20 }}>
                      Xác Nhận
                    </Button>
                    <Button
                      className="cancel"
                      variant="contained"
                      style={{ marginTop: 20 }}
                      onClick={handleClose}
                    >
                      Hủy Bỏ
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
            <p>ID sản phẩm:</p>
            <p>Tên sản phẩm:</p>
            <p>Thương hiệu:</p>
            <p>Giá:</p>
            <p>Trọng lượng:</p>
            <p>Loại 1:</p>
            <p>Loại 2:</p>
            <p>Được đánh giá: </p>
          </div>
          <div className="info-detail">
            <p>{listInfo.Product_id}</p>
            <p>{listInfo.Product_name}</p>
            <p>{listInfo.Product_brand}</p>
            <p style={{ color: 'red' }}>{listInfo.Product_price} đ</p>
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

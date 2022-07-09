// material
import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import { FastField, Form, Formik } from 'formik';
import { React, useEffect, useState } from 'react';
import * as yup from 'yup';
// components
import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/products';
import './css/Input.css';

// ----------------------------------------------------------------------

function SelectField(props) {
  const { field, form, label, options } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <div className="select-field">
      <label htmlFor={name}>{label}</label>
      <select name={name} {...field} id={name} className={showError && 'errors'}>
        {options.map((option) => (
          <option id="idCategory" value={option.Category_id} key={option.Category_id}>
            {option.Category_name}
          </option>
        ))}
      </select>
      {showError && <span>{errors[name]}</span>}
    </div>
  );
}

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

function Products() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openCategory, setOpenCategory] = useState(false);
  const handleOpenCategory = () => setOpenCategory(true);
  const handleCloseCategory = () => setOpenCategory(false);
  const [detailCategory, setDetailCategory] = useState('');

  const initialValues = {
    Product_name: '',
    Product_brand: '',
    Product_price: '',
    Product_weight: '',
    Category_detail: '',
    CategoryName: ''
  };

  const validationSchema = yup.object().shape({
    Product_name: yup.string().required('Vui lòng kiểm tra Tên sản phẩm của bạn!'),
    Product_brand: yup.string().required('Vui lòng kiểm tra Thương hiệu của bạn!'),
    Product_price: yup.string().required('Vui lòng kiểm tra Giá của bạn!'),
    Product_weight: yup.string().required('Vui lòng kiểm tra Trọng lượng của bạn!'),
    CategoryName: yup.string().required('Vui lòng kiểm tra Tên loại của bạn!')
  });

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getData = async () => {
      axios
        .post('http://localhost:8080/comestic/public/api/getAllProduct')
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

  const [category, SetCategory] = useState([]);
  useEffect(() => {
    const getData = async () => {
      axios
        .get('http://localhost:8080/comestic/public/api/category')
        .then((response) => {
          SetCategory(response.data.Data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  const [categoryDetail, setCategoryDetail] = useState([]);
  function getDetailCategory() {
    axios
      .get(`http://localhost:8080/comestic/public/api/category_detail`)
      .then((response) => {
        setCategoryDetail(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function changeDetail() {
    setDetailCategory(document.getElementById('categories_detail').value);
  }

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState('');
  const [nameImg, setNameImg] = useState('');

  function onChangeImage(e) {
    setFiles(e.target.files);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

      setNameImg(e.target.files[0].name);
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  }

  function renderPhotos(source) {
    return (
      <div className="Preview-img" style={{ width: '300px', maxHeight: '300px' }}>
        <img id="create-post-carousel-img" src={source} alt="" />
      </div>
    );
  }

  function handleClosePreview(e) {
    if (e.target.files) {
      const filesArray = '';
    }

    setSelectedFiles([]);
    renderPhotos(selectedFiles);
  }
  const [disNone, setDisNone] = useState('none');

  function addCategory(value) {
    const dataAdd = {
      CategoryName: document.getElementById('CategoryName').value
    };
    axios
      .post('http://localhost:8080/comestic/public/api/addcategory', dataAdd)
      .then((response) => {
        if (response.data.error) {
          setDisNone('block');
          handleCloseCategory();
          setTimeout(() => {
            setDisNone('none');
          }, 3000);
        } else {
          handleCloseCategory();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [productName, SetProductName] = useState('');
  const [productBrand, SetProductBrand] = useState('');
  const [productPrice, SetProductPrice] = useState('');
  const [productWeight, SetProductWeight] = useState('');

  function onSubmit() {
    const dataAdd = {
      Product_name: productName,
      Product_brand: productBrand,
      Product_price: productPrice,
      Product_weight: productWeight,
      Category_detail: detailCategory,
      Product_image: nameImg
    };
    axios
      .post('http://localhost:8080/comestic/public/api/addproduct', dataAdd)
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          setDisNone('block');
          handleClose();
          setTimeout(() => {
            setDisNone('none');
          }, 3000);
        } else {
          setProduct(response.data.data);
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Alert style={{ display: disNone }} severity="error">
          <AlertTitle>Lỗi</AlertTitle>
          Tên sản phẩm đã tồn tại
        </Alert>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Thêm sản phẩm
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (value) => {
                const dataAdd = {
                  Product_name: value.Product_name,
                  Product_brand: value.Product_brand,
                  Product_price: value.Product_price,
                  Product_weight: value.Product_weight,
                  Category_detail: detailCategory,
                  Product_image: nameImg
                };
                axios
                  .post('http://localhost:8080/comestic/public/api/addproduct', dataAdd)
                  .then((response) => {
                    console.log(response);
                    if (response.data.error) {
                      setDisNone('block');
                      handleClose();
                      setTimeout(() => {
                        setDisNone('none');
                      }, 3000);
                    } else {
                      setProduct(response.data.data);
                      handleClose();
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              {() => (
                <Form className="AddProduct">
                  <input
                    name="Product_name"
                    placeholder="Tên sản phẩm "
                    value={productName}
                    onChange={(e) => SetProductName(e.target.value)}
                  />
                  <input
                    name="Product_brand"
                    placeholder="Thương hiệu"
                    value={productBrand}
                    onChange={(e) => SetProductBrand(e.target.value)}
                  />
                  <input
                    name="Product_price"
                    placeholder="Giá"
                    value={productPrice}
                    onChange={(e) => SetProductPrice(e.target.value)}
                  />
                  <input
                    name="Product_weight"
                    placeholder="Trọng lượng"
                    value={productWeight}
                    onChange={(e) => SetProductWeight(e.target.value)}
                  />
                  {category ? (
                    <div className="select-field">
                      <p>Chi tiết loại</p>
                      <select
                        name="categories_detail"
                        id="categories_detail"
                        onClick={getDetailCategory}
                        onBlur={() => changeDetail()}
                      >
                        {categoryDetail.map((item) => (
                          <option value={item.Category_detail_id} key={item.Category_detail_id}>
                            {item.Category_detail_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <select name="categories_detail" id="categories_detail">
                      <option value="">Chưa chọn Loại</option>
                    </select>
                  )}
                  <div className="create-post-icon-image">
                    <div>
                      <label id="label-image" htmlFor="picture-pick">
                        <input
                          type="file"
                          id="picture-pick"
                          hidden
                          onChange={(e) => onChangeImage(e)}
                        />
                        Add image
                      </label>
                      <Button onClick={(e) => handleClosePreview(e)}>X</Button>
                    </div>
                    <div className="result">{renderPhotos(selectedFiles)}</div>
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={() => onSubmit()}
                    style={{ marginTop: 20 }}
                  >
                    Submit
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

        <Modal
          open={openCategory}
          onClose={handleCloseCategory}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="Box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Thêm loại sản phẩm
            </Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema}>
              {() => (
                <Form>
                  <FastField
                    name="CategoryName"
                    component={InputFieldUI}
                    label="Tên loại sản phẩm"
                    type="text"
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ marginTop: 20 }}
                    onClick={() => addCategory('CategoryName')}
                  >
                    Submit
                  </Button>
                  <Button
                    className="cancel"
                    variant="contained"
                    style={{ marginTop: 20 }}
                    onClick={handleCloseCategory}
                  >
                    Hủy Bỏ
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
        <Typography
          variant="h4"
          sx={{ mb: 5 }}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          Sản phẩm
          <div className="btn-group">
            <Button size="small" variant="contained" onClick={handleOpen}>
              Thêm sản phẩm
            </Button>
            <Button size="small" variant="contained" onClick={handleOpenCategory}>
              Thêm Loại sản phẩm
            </Button>
          </div>
        </Typography>
        <ProductList products={product} />
      </Container>
    </Page>
  );
}
export default Products;

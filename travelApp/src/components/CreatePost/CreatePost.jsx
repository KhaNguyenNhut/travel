import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import cityApi from "../../api/cityApi";
import postApi from "../../api/postApi";

import "./CreatePost.scss";

export default function CreatePost() {
  var user = JSON.parse(localStorage.getItem("user"));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #1E90FF",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
  };
  const [alertSuccess, setAlertSuccess] = useState("none");
  const [alertError, setAlertError] = useState("none");
  const [image, setImage] = useState([]);
  const [content, setContent] = useState("");

  const [publicPost, setPublicPost] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [location, setLocation] = useState("");
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const arrayDistrict = [];

  useEffect(() => {
    const fetchCityList = async () => {
      try {
        const city = await cityApi.getCity();
        setCity(city);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCityList();
  }, []);

  function getDistricts() {
    var city_id = document.getElementById("city").value;
    const fetchDistrict = async () => {
      try {
        const districts = await cityApi.getDistrict(city_id);
        // eslint-disable-next-line no-lone-blocks
        {
          districts
            .filter((district) => district.city === city_id)
            .map((filteredDistrict) => {
              arrayDistrict.push(filteredDistrict);
              setDistrict(arrayDistrict);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDistrict();
  }

  function selectDistrict() {
    var district_id = document.getElementById("districts").value;
    setLocation(district_id);
  }

  function handleChangeImage(e) {
    let allfiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      allfiles.push(e.target.files[i]);
    }
    if (allfiles.length > 0) {
      setImage(allfiles);
    }
  }

  const handleCreatePost = async () => {
    if (content.toString().length === 0) {
      setAlertError("block");
      setTimeout(() => {
        setAlertError("none");
      }, 3000);
    } else {
      var user = JSON.parse(localStorage.getItem("user"));
      const data = {
        content: content,
        images: image[0].name,
        district: location,
        isPublic: publicPost,
        user: user._id,
      };
      const post = await postApi.create(data);
      console.log();
      setContent("");
      setLocation("");
      setImage([]);
      setAlertSuccess("block");
      setTimeout(() => {
        setAlertSuccess("none");
      }, 3000);
    }
  };
  var optionCity = city.map((city) => (
    <option value={city.id} key={city.name}>
      {city.name}
    </option>
  ));

  var optionDistrict = district.map((district) => (
    <option value={district.id} key={district.name}>
      {district.name}
    </option>
  ));

  return (
    <div className="CreatePost">
      <Stack sx={{ width: "100%" }} spacing={1}>
        <Alert
          style={{ display: alertError }}
          severity="error"
          className="AlertContainer"
        >
          <AlertTitle>Error</AlertTitle>
          Đăng bài viết thất bại — <strong>Vui lòng kiểm tra lại!</strong>
        </Alert>
        <Alert
          style={{ display: alertSuccess }}
          severity="success"
          className="AlertContainer"
        >
          <AlertTitle>Success</AlertTitle>
          Đăng bài viết thành công —{" "}
          <strong>Mời bạn tiếp tục trải nghiệm!</strong>
        </Alert>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chọn địa điểm
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="city-grp">
              <h5>Thành phố</h5>
              <select name="city" id="city" onChange={getDistricts}>
                {optionCity}
              </select>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="location-grp">
              <h5>Địa điểm</h5>
              <select name="districts" id="districts" onChange={selectDistrict}>
                {optionDistrict}
              </select>
            </div>
          </Typography>
          <button className="btn btn-location" onClick={handleClose}>
            Xác nhận
          </button>
        </Box>
      </Modal>
      <div className="CreatePost-top">
        <div className="CreatePost-sub">
          <img src={user.avatar ? user.avatar : "/assets/images/avatar.jpg"} />
        </div>
        <div className="CreatePost-main">
          <textarea
            type="text"
            placeholder="Chia sẻ trãi nghiệm..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      {image.map((file, key) => {
        return (
          <div key={key} className="imagePost">
            <span className="Filename">
              {file.name.split(".")[1] === "mp4" ? (
                <video src={URL.createObjectURL(file)} controls />
              ) : (
                <img src={URL.createObjectURL(file)} alt={file.name} />
              )}
            </span>
          </div>
        );
      })}
      <div className="CreatePost-bot">
        <div className="CreatePost-bot-items">
          <input
            type="file"
            name="file"
            id="file"
            className="inputfile"
            multiple
            onChange={handleChangeImage}
          />
          <label
            htmlFor="file"
            className="create-post-label flex items-center cursor-pointer"
          >
            <img src="/assets/images/uploadimage.png" alt="" />
            <p className="label-name">Ảnh/Video</p>
          </label>
        </div>
        <div className="CreatePost-bot-items" onClick={handleOpen}>
          <img id="image-checkin" src="/assets/images/checkin.png" alt="" />
          <p className="label-name">Địa điểm</p>
        </div>
        <div className="CreatePost-bot-items">
          <label
            className="create-post-label cursor-pointer"
            onClick={(e) => setPublicPost(!publicPost)}
          >
            {publicPost === true ? (
              <div className="public-icon flex items-center">
                <img src="/assets/images/tag.png" alt="" />
                <p className="ml-4 label-name">Công khai</p>
              </div>
            ) : (
              <div className="public-icon flex items-center">
                <img src="/assets/images/private.png" alt="" />
                <p className="ml-4 label-name">Riêng tư</p>
              </div>
            )}
          </label>
        </div>
        <div className="CreatePost-bot-items">
          <button type="submit" onClick={handleCreatePost}>
            Đăng
          </button>
        </div>
      </div>
    </div>
  );
}
